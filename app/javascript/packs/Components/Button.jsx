import React from 'react'
import Optimized from '../Lib/Optimized'

export default class Buttom extends Optimized {
  initialize () {
    this.bind = ["setButtonColor"]
    this.bgActiveColor = this.props.bgActiveColor || t.green
    this.bgColor = this.props.bgColor || "transparent"
    this.border = this.props.border || "2px solid " + t.green
    this.color = this.props.color || t.white
    this.margin = this.props.margin || 15
    this.paddingV = this.props.paddingV || this.props.padding || 10
    this.paddingH = this.props.paddingH || this.props.padding || 35
    this.size = this.props.size || 19
    this.radius = this.props.radius || 4

    this.state = {buttonColor: this.bgColor}
  }

  setButtonColor (color) {
    this.setState({buttonColor: color})
  }

  render () {
    return <Flex margin={this.margin} size={this.size} radius={this.radius} BG={this.state.buttonColor} onMouseEnter={() => this.setButtonColor(this.bgActiveColor)} onMouseLeave={() => this.setButtonColor(this.bgColor)} style={[s.animate("all", 300), {border: this.border, color: this.color, fontFamily: 'Roboto'}]}>
      <Link to={this.props.to} style={[s.padding(this.paddingV, this.paddingH), s.shrink(0), s.noDecoration, {color: t.white}].merge()}>
        {this.props.label}
      </Link>
    </Flex>
  }
}
