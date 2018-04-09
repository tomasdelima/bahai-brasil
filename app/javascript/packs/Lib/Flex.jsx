import React, { Component } from 'react'
import Optimized from './Optimized'

export default class Flex extends Optimized {
  shouldComponentUpdate () {
    return Object.keys(this.props).indexOf("optimize") >= 0 ? !this.props.optimize : super.shouldComponentUpdate()
  }

  render () {
    var style = [s.flex, s.center1, s.center2]
    var props = {}

    Object.keys(this.props).map(prop => {
      if(["optimize"].indexOf(prop) >= 0) return

      if (s[prop] && (this.props[prop] || this.props[prop] == 0)) {
        if (s[prop].constructor.name == "Function") {
          style.push(s[prop](this.props[prop]))
        } else {
          style.push(s[prop])
        }
      } else {
        if (["children", "style", "id", "onMouseEnter", "onMouseLeave", "onClick", "className"].indexOf(prop) >= 0) {
          props[prop] = this.props[prop]
        } else {
          console.log("Ignoring unknown div attribute: " + prop)
        }
      }
    })

    Object.assign(props, {style: style.concat(this.props.style).merge(), children: null})
    return React.createElement('div', props, this.props.children)
  }
}
