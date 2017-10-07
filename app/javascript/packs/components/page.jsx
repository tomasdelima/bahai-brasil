import React from 'react'
import Markdown from './markdown'
import ReactGA from 'react-ga'
ReactGA.initialize(gaKey)

export default React.createClass({
  getInitialState() {
    return {
      editorMode: user && window.location.hash == "#editor" && !this.props.embedded,
      ...this.page(),
    }
  },
  page () {
    var slug = this.props.slug || this.props.match.params.slug
    return pages.filter((p) => p.slug == slug)[0] || pages.filter((p) => p.slug == "")[0]
  },
  toggleEditorMode () {
    if (user && !this.props.embedded) {
      window.location.hash = !this.state.editorMode ? "#editor" : ""
      this.setState({editorMode: !this.state.editorMode})
    }
  },
  componentDidMount() {
    if (!this.props.embedded) {
      this.logPageToGoogleAnalytics()
    }
  },
  componentWillReceiveProps(nextProps) {
    if (this.state.slug != nextProps.match.params.slug || !this.state.slug) {
      this.logPageToGoogleAnalytics()
      this.setState(pages.filter((p) => p.slug == nextProps.match.params.slug)[0] || pages.filter((p) => p.slug == "")[0])
    }
  },
  logPageToGoogleAnalytics () {
    ReactGA.set({page: window.location.pathname + window.location.search})
    ReactGA.pageview(window.location.pathname + window.location.search)
  },
  updateBody (e) {
    this.setState({body: e.nativeEvent.target.value, changed: true, error: false})
  },
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
  },
  toggleEditButton (value) {
    this.setState({showEditButton: this.props.embedded && value})
  },
  goToEditPage () {
    window.location = this.props.slug + "#editor"
  },
  renderEditor () {
    return this.state.editorMode ? <textarea onChange={this.updateBody} value={this.state.body} style={[s.wide("calc(100% - 6px)"), s.high(300), s.margin(10, 0)].merge()}/> : null
  },
  renderEditorButton () {
    if (!user || this.props.embedded) return null

    if (this.state.saving) {
      var obj = {
        text: "Salvando",
        icon: "clock-o",
        bg: s.lightGrayBG,
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
  },
  renderBody () {
    return <div style={[s.relative].merge()} onMouseEnter={() => this.toggleEditButton(true)} onMouseLeave={() => this.toggleEditButton(false)}>
      <Markdown args={this.props.args}>{this.state.body}</Markdown>
      {this.state.showEditButton ? <i className="fa fa-pencil" onClick={this.goToEditPage} style={[s.absolute, s.top(0), s.right(-15), s.darkWaterBG, s.white, s.radius(4), s.padding(5), s.pointer].merge()}/> : null}
      </div>
  },
  render () {
    return <div className="page" style={[s.maxWidth(1000, "100%"), s.wide("calc(100% - 16px)")].merge()}>
      {this.renderEditor()}
      {this.renderEditorButton()}
      {this.renderBody()}
    </div>
  }
})
