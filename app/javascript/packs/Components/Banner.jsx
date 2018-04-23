import React from 'react'
import Optimized from '../Lib/Optimized'

export default class Banner extends Optimized {
  initialize () {
    this.height = 0
  }

  componentDidMount () {
    $("#topbar img").one("load", () => {
      this.setState({height: this.props.height || (window.innerHeight - $("#topbar").parent().height())})
    })
  }

  render () {
    return <Flex wide end2 bgImage={this.props.image} high={this.state.height} relative style={{overflow: "hidden", backgroundSize: "cover", backgroundPosition: "center top"}}>
      <Flex absolute wide={600} left="calc(50% - 300px)" top="50%" bold size={28} style={{color: t.white, fontFamily: 'Roboto'}}>{this.props.body}</Flex>
      <GreenStrip/>
    </Flex>
  }
}
