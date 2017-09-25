import React from 'react'
import Markdown from './markdown'

export default React.createClass({
  getInitialState() {
    this.buttonStyle = [s.wide(85), s.darkWaterBG, s.noSelect, s.pointer, s.radius(3), s.noBorder, s.padding(8), s.white, s.breeSerif].merge()
    return {
      saveStatus: "Salvo",
      editorMode: user && window.location.hash == "#editor" && !this.props.preventEditorMode,
      ...this.page(),
    }
  },
  page () {
    var slug = this.props.slug || this.props.match.params.slug
    return pages.filter((p) => p.slug == slug)[0] || pages.filter((p) => p.slug == "")[0]
  },
  toggleEditorMode () {
    if (user && !this.props.preventEditorMode) {
      window.location.hash = !this.state.editorMode ? "#editor" : ""
      this.setState({editorMode: !this.state.editorMode})
    }
  },
  componentWillReceiveProps(nextProps) {
    if (this.state.slug != nextProps.match.params.slug) {
      this.setState(pages.filter((p) => p.slug == nextProps.match.params.slug)[0] || pages.filter((p) => p.slug == "")[0])
    }
  },
  updateBody (e) {
    this.setState({body: e.nativeEvent.target.value, saveStatus: "Alterado", changed: true})
  },
  save () {
    this.setState({saveStatus: "Salvando", saving: true})
    fetch('/api/v1/page/' + this.state.id, {
      method: 'PATCH',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({body: this.state.body})
    })
    .then(() => this.setState({saveStatus: "Salvo", changed: false, saving: false}))
    .then(() => pages[pages.indexOf(this.page())].body = this.state.body)
    .catch((error) => {
      this.setState({saveStatus: "Erro"})
      console.log(error)
    })
  },
  renderToggleEditorButton () {
    return <button style={this.buttonStyle} onClick={this.toggleEditorMode}>{this.state.editorMode ? "Visualizar" : "Editar"}</button>
  },
  renderBody () {
    if (this.state.editorMode) {
      return <div>
        <textarea onChange={this.updateBody} value={this.state.body} style={[s.wide("calc(100% - 6px)"), s.high(300), s.margin(10, 0)].merge()}/>
        <div style={[s.flex, s.spacedIn].merge()}>
          {this.renderToggleEditorButton()}
          <button style={this.buttonStyle} onClick={this.save} disabled={this.state.saving || !this.state.changed}>{this.state.saveStatus}</button>
        </div>
        <Markdown>{this.state.body}</Markdown>
      </div>
    } else {
      return <div>
        <Markdown>{this.state.body}</Markdown>
        {user && !this.props.preventEditorMode ? this.renderToggleEditorButton() : null}
      </div>
    }
  },
  render () {
    return <div style={[s.maxWidth(1000, "100%"), s.wide("calc(100% - 16px)")].merge()}>
      {this.renderBody()}
    </div>
  }
})
