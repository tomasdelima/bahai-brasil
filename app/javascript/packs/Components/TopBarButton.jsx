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
    var m = s.isMobile()

    return <Link to={this.props.to} style={s.noDecoration}>
      <Flex white margin={5} radius={4} size={s.isMobile() ? "xx-large" : "medium"} pointer alignCenter BG={t[this.props.background] || "transparent"} text color={this.state.color} style={[s.padding(10, 10), this.props.style, s.animate('all', 200), !m && s.bold]} onMouseEnter={this.toggleColor} onMouseLeave={this.toggleColor}>{this.props.title}</Flex>
    </Link>
  }
}
