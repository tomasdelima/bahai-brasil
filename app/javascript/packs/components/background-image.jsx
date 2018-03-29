import React from 'react'

export default class BackgroundImage extends React.Component {
  render () {
    return this.props.image ? <div style={this.props.wide ? s.wide() : null, s.bgImage(images[this.props.image])}>
      {this.props.children}
    </div> : null
  }
}
