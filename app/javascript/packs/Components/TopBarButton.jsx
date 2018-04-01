import React from 'react'
import Optimized from '../Lib/Optimized'

export default class TopBarButton extends Optimized {
  initialize () {
    this.bind = ["toggleColor"]
    this.state = {color: t[this.props.color] || t.white}
  }

  toggleColor (event) {
    var color = event.type == "mouseenter" ? (t[this.props.activeColor] || t.green) : (t[this.props.color] || t.white)
    this.setState({color: color})
  }

  render () {
    return <Link to={this.props.to} style={s.noDecoration}>
      <Flex white margin={5} radius={4} size={16} pointer bold alignCenter BG={t[this.props.background] || "transparent"} style={[s.padding(10, 10), this.props.style, s.animate('all', 200), {fontFamily: 'Roboto', color: this.state.color}]} onMouseEnter={this.toggleColor} onMouseLeave={this.toggleColor}>{this.props.title}</Flex>
    </Link>
  }
}
