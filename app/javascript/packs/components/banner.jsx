import React from 'react'

export default class Banner extends React.Component {
  constructor (props) {
    super(props)
    this.state = {height: 0}
  }

  render () {
    return this.props.banner ? <div style={s.wide()}>
      <div style={[s.rect({h: this.state.height}), s.absolute, s.left(), s.bgImage(this.props.banner), {backgroundSize: "cover", backgroundPosition: "center"}].merge()} />
      <img style={[s.rect({h: this.state.height, w: 0})].merge()} src={this.props.banner} onLoad={() => {this.setState({height: window.innerHeight})}}/>
    </div> : null
  }
}
