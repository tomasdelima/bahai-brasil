import React from 'react'
import Optimized from '../Lib/Optimized'

export default class BottomLink extends Optimized {
  initialize () {
    this.bind = ["setButtonColor"]
    this.state = {buttonColor: "transparent"}
  }

  setButtonColor (color) {
    this.setState({buttonColor: color})
  }

  render () {
    return <Flex column>
      <img src={this.props.icon} style={s.margin(0, 0, 15)}/>
      <Button to={this.props.to} label={this.props.label} border={"2px solid rgba(" + t.greenRgb + ", 0.5)"}/>
    </Flex>
  }
}
