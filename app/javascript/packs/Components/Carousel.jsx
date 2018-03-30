import React from 'react'
import Optimized from '../Lib/Optimized'

export default class Carousel extends Optimized {
  initialize () {
    this.setMeasurements()
    this.bind = ["scrollTo"]
    this.state = {left: 0}
  }

  setMeasurements () {
    this.containerWidth = this.props.containerWidth || $("body").prop("clientWidth")
    this.itemWidth = this.props.itemWidth || 890
    this.itemHeight = this.props.itemHeight || 570
    this.offset = (this.containerWidth - this.itemWidth)/2
  }

  componentDidMount() {
    this.setMeasurements()
    this.scrollTo(0)
  }

  scrollTo (index) {
    this.setState({active: index, left: this.offset - index * this.itemWidth, a: $("body").prop("clientWidth")})
  }

  render () {
    var a = this.state.active
    return <Flex column>
      <Flex start1 relative wide={this.containerWidth} high={this.itemHeight} style={[{overflow: "hidden"}]}>
        {this.props.items.map((item, i) => <Flex onClick={() => this.scrollTo(i)} relative shrink={0} radius={3} key={i} bgImage={item.image} wide={this.itemWidth} high={this.itemHeight} style={[s.animate("all", 300), {left: this.state.left,backgroundPosition: "center center", backgroundSize: "cover", marginLeft: 15, marginRight: 15}]}>
          {a != i ? <Flex wide high BG={s.t.dark(0.5)} radius={3}/> : <Flex end1 column high style={[{color: t.white, fontFamily: "Roboto"}]}>
            <Flex size={39} padding={30} style={{}}>{item.title}</Flex>
            <Flex size={20} wide={550} alignCenter style={{}}>{item.text1}</Flex>
            <Flex size={20} wide={550} alignCenter style={{}}>{item.text2}</Flex>
            <Flex size={20} radius={3} BG={"rgba(" + t.greenRgb + ", 0.5)"} style={s.padding(13, 30)} margin={40}><Link to={item.to} style={[s.noDecoration, {color: t.white}].merge()}>{item.buttonLabel}</Link></Flex>
          </Flex>}
        </Flex>)}
      </Flex>

      <Flex margin={40}>
        {this.props.items.map((item, i) => <Flex key={i} pointer onClick={() => this.scrollTo(i)} padding={5}>
          <Flex circle={a == i ? 10 : 5} BG={a == i ? t.green : "#646B6D"} />
        </Flex>)}
      </Flex>
    </Flex>
  }
}
