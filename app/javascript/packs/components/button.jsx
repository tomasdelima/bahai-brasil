import React from 'react'

export default class Button extends React.Component {
  render () {
    return <span style={[s.inline, s.BG(this.props.bg), s.border(this.props.border ? 2 : 0, this.props.border), s.padding(15), s.radius(5), s.white].merge()}>
      {this.props.children}
    </span>
  }
}
