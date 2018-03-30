import React from 'react'
import Optimized from '../Lib/Optimized'

export default class TopBar extends Optimized {
  initialize () {
    this.bind = ["setHeight"]
  }

  componentDidMount () {
    this.setHeight()
  }

  setHeight () {
    this.setState({height: document.getElementById("topbar").clientHeight})
  }

  render () {
    return <Flex wide high relative>
      <img src={this.props.image} style={[s.wide(), {borderBottom: "9px solid " + t.green}].merge()}/>
      <Flex absolute wide={600} left="calc(50% - 300px)" top="50%" bold size={28} style={{color: t.white, fontFamily: 'Roboto'}}>{this.props.body}</Flex>
    </Flex>
  }
}
