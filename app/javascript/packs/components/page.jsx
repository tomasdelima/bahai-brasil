import React from 'react'
// import {Markdown, Editor} from 'react-custom-markdown'
import {Markdown, Editor} from '/home/tomas/Projects/react-custom-markdown'
import TopBar from './top-bar'
import Banner from './banner'
import ReactGA from 'react-ga'

import CustomElements from './custom-elements'

ReactGA.initialize(gaKey)

export default class Page extends React.Component {
  constructor (props) {
    super(props);
    ["save", "updateBody", "toggleEditorMode"].map((i) => this[i] = this[i].bind(this))
    this.state = {
      editorMode: user && window.location.hash == "#editor" && !this.props.embedded,
      showEditEmbedded: user && window.location.hash == "#editor" && this.props.embedded,
      ...this.page(),
    }
  }

  page () {
    var slug = this.props.slug || this.props.match.params.slug
    return pages.filter((p) => p.slug == slug)[0] || pages.filter((p) => p.slug == "")[0]
  }

  toggleEditorMode () {
    if (user && !this.props.embedded) {
      window.location.hash = !this.state.editorMode ? "#editor" : ""
      this.setState({editorMode: !this.state.editorMode})
    }
  }

  componentDidMount() {
    if (!this.props.embedded) {
      this.logPageToGoogleAnalytics()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.slug != nextProps.match.params.slug || !this.state.slug) {
      this.logPageToGoogleAnalytics()
      this.setState({changed: false, error: false})
      this.setState(pages.filter((p) => p.slug == nextProps.match.params.slug)[0] || pages.filter((p) => p.slug == "")[0])
    }
  }

  logPageToGoogleAnalytics () {
    ReactGA.set({page: window.location.pathname + window.location.search})
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

  updateBody (e) {
    try {
      var body = e.nativeEvent.target.value
    } catch (err) {
      var body = e
    }

    this.setState({body: body, changed: true, error: false})
  }

  save () {
    this.setState({saving: true, error: false})
    fetch('/api/v1/page/' + this.state.id, {
      method: 'PATCH',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({body: this.state.body})
    })
    .then(() => this.setState({changed: false, saving: false}))
    .then(() => pages[pages.indexOf(this.page())].body = this.state.body)
    .catch((error) => {
      this.setState({error: true, saving: false, changed: true})
      console.log(error)
    })
  }

  renderEditorButton () {
    if (!user || this.props.embedded) return null

    if (this.state.saving) {
      var obj = {
        text: "Salvando",
        icon: "clock-o",
        bg: s.BG('#666'),
      }
    } else if (this.state.changed) {
      var obj = {
        onClick: this.save,
        icon: "floppy-o",
        text: "Salvar",
        bg: s.yellowBG,
      }
    } else if (this.state.editorMode) {
      var obj = {
        onClick: this.toggleEditorMode,
        icon: "eye",
        text: "Visualizar",
        bg: s.darkWaterBG,
      }
    } else if (this.state.error) {
      var obj = {
        onClick: this.save,
        icon: "exclamation",
        text: "Houve um erro!",
        bg: s.darkRedBG,
      }
    } else {
      var obj = {
        onClick: this.toggleEditorMode,
        icon: "pencil",
        text: "Editar",
        bg: s.darkWaterBG,
      }
    }

    return <div style={[s.fixed, s.right(20), s.bottom(10), s.zindex(1), s.flex, s.center2, s.animate(), s.noSelect, s.pointer, s.radius(3), s.noBorder, s.breeSerif, s.white2BG, s.padding(7)].merge()} onClick={obj.onClick} disabled={!obj.onClick}>
      <span style={s.margin(0, 10)}>{obj.text}</span>
      <i className={"fa fa-" + obj.icon} style={[s.flex, s.center1, s.center2, s.circle(40), obj.bg, s.white].merge()}/>
    </div>
  }

  renderBody () {
    return <div>
      <div style={s.relative}>
        {this.state.showEditEmbedded && <a className="fa fa-pencil" href={this.props.slug + "#editor"} style={[s.absolute, s.top(0), s.right(-8), s.noDecoration, s.darkWaterBG, s.white, s.radius(4), s.padding(5), s.pointer].merge()}d/>}
      </div>
      <Markdown customElementsRenderer={CustomElements.renderer.bind(this)} customRules={CustomElements.rules}>{this.state.body}</Markdown>
    </div>
  }

  render () {
    return <div style={s.wide()}>
      {!this.props.embedded && <TopBar transition={this.state.menu_has_transition && !this.state.editorMode}/>}

      <div className="page" style={[s.maxWidth(1000, "100%"), s.wide("calc(100% - 16px)"), {margin: "auto"}].merge()}>
        {this.state.editorMode && <div style={s.margin(10, 0, 0)}><Editor body={this.state.body} changed={this.state.changed} onSave={this.save} onChange={this.updateBody}/></div>}
        {this.renderEditorButton()}
        {this.renderBody()}
      </div>
    </div>
  }
}
