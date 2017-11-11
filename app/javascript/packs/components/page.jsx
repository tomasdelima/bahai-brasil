import React from 'react'
import Markdown from 'react-custom-markdown'
import ReactGA from 'react-ga'
ReactGA.initialize(gaKey)

export default class Page extends React.Component {
  constructor (props) {
    super(props)
    this.save = this.save.bind(this)
    this.updateBody = this.updateBody.bind(this)
    this.state = {
      editorMode: user && window.location.hash == "#editor" && !this.props.embedded,
      ...this.page(),
    }

    this.customRules = [
      {name: 'page',     regexp: (/\[page:(.+?)\]/),      stopRulesPropagation: true},
      {name: 'argument', regexp: (/\[argument:(\d+?)\]/), stopRulesPropagation: true},
    ]
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
      this.setState(pages.filter((p) => p.slug == nextProps.match.params.slug)[0] || pages.filter((p) => p.slug == "")[0])
    }
  }

  logPageToGoogleAnalytics () {
    ReactGA.set({page: window.location.pathname + window.location.search})
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

  updateBody (e) {
    this.setState({body: e.nativeEvent.target.value, changed: true, error: false})
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

  renderEditor () {
    return this.state.editorMode ? <textarea onChange={this.updateBody} value={this.state.body} style={[s.wide("calc(100% - 6px)"), s.high(300), s.margin(10, 0)].merge()}/> : null
  }

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
  }

  customElementsRenderer (fragment, props) {
    if (fragment.rule == 'page') {
      var args = ['']
      var c = fragment.content
      for (var i =0; i < c.length; i++) {
        args[args.length-1] += c[i] == ':' ? c[i-1] == '\\' ? ':' : '' : c[i]
        if (c[i] == ':') {
          if (c[i-1] != '\\') {
            args.push('')
          } else {
            args[args.length-1] = args[args.length-1].slice(0, -2) + args[args.length-1].slice(-1)
          }
        }
      }
      return <Page slug={args[0]} args={args} embedded key={props.i}/>
    } else if (fragment.rule == 'argument') {
      var args = props.args || [...Array(Number(fragment.content)+1||0)].map((v,i) => "Argument #"+i)
      return <span key={props.i} className="argument">{args[fragment.content]}</span>
    }
  }

  renderBody () {
    return <div style={[s.relative].merge()}>
      <Markdown customElementsRenderer={this.customElementsRenderer} customRules={this.customRules}>{this.state.body}</Markdown>
      {user && this.props.slug ? <a className="fa fa-pencil" href={this.props.slug + "#editor"} style={[s.absolute, s.top(0), s.right(-8), s.noDecoration, s.darkWaterBG, s.white, s.radius(4), s.padding(5), s.pointer].merge()}/> : null}
    </div>
  }

  render () {
    return <div className="page" style={[s.maxWidth(1000, "100%"), s.wide("calc(100% - 16px)"), {margin: "auto"}].merge()}>
      {this.renderEditor()}
      {this.renderEditorButton()}
      {this.renderBody()}
    </div>
  }
}
