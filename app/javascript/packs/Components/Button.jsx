import React from 'react'
import Optimized from '../Lib/Optimized'

export default class Buttom extends Optimized {
  initialize () {
    this.bind = ["setButtonColor"]
    this.bgActiveColor = this.props.bgActiveColor || t.green
    this.bgColor = this.props.bgColor || "transparent"
    this.border = this.props.border || "2px solid " + t.green
    this.color = this.props.color || t.white
    this.activeColor = this.props.activeColor || t.white
    this.margin = this.props.margin || 15
    this.paddingV = this.props.paddingV || this.props.padding || 10
    this.paddingH = this.props.paddingH || this.props.padding || 35
    this.size = this.props.size || (s.isMobile() ? "xx-large" : "larger")
    this.radius = this.props.radius || 4

    this.state = {bgColor: this.bgColor, color: this.color}
  }

  setButtonColor (entering) {
    if (entering) {
      this.setState({bgColor: this.bgActiveColor, color: this.activeColor})
    } else {
      this.setState({bgColor: this.bgColor, color: this.color})
    }
  }

  render () {
    var element = this.props.to ? Link : Flex
    var props = {to: this.props.to, onClick: this.props.onClick, style: [s.animate("all", 300), s.padding(this.paddingV, this.paddingH), s.shrink(0), s.noDecoration, s.pointer, s.flex, s.noWrap, {color: this.state.color}].merge()}

    return <Flex margin={this.margin} size={this.size} radius={this.radius} BG={this.state.bgColor} onMouseEnter={() => this.setButtonColor(true)} onMouseLeave={() => this.setButtonColor()} style={[s.animate("all", 300), {border: this.border, color: this.color, fontFamily: 'Roboto'}]}>
      {React.createElement(element, props, this.props.label)}
    </Flex>
  }
}
