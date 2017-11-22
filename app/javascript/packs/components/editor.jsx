import React from 'react'

export default class Editor extends React.Component {
  constructor (props) {
    super(props)
    this.captureSave = this.captureSave.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.enabled) {
      document.removeEventListener("keydown", this.captureSave)
    } else {
      document.addEventListener("keydown", this.captureSave)
    }
  }

  captureSave (e) {
    if (e.ctrlKey && (e.key == "s" || e.key == "S")) {
      this.props.changed ? this.props.save() : null
      e.preventDefault()
    }
  }

  render () {
    return this.props.enabled && <textarea ref="editor" onChange={this.props.updateBody} value={this.props.body} style={[s.wide("calc(100% - 6px)"), s.high(300), s.margin(0, 0, 10)].merge()}/>
  }
}
