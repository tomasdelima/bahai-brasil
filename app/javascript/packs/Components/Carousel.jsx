import React from 'react'
import Optimized from '../Lib/Optimized'

export default class Carousel extends Optimized {
  initialize () {
    this.setMeasurements()
    this.bind = ["scrollTo", "loop"]
    this.state = {left: 0, active: -1}
  }

  setMeasurements () {
    this.containerWidth = this.props.containerWidth || $("body").prop("clientWidth")
    this.itemWidth = this.props.itemWidth || 890
    this.itemHeight = this.props.itemHeight || 570
    this.offset = (this.containerWidth - this.itemWidth)/2
  }

  componentDidMount() {
    this.setMeasurements()
    this.loop()
  }

  componentWillUnmount () {
    this.isUnmounted = true
  }

  loop () {
    if (!this.isUnmounted) {
      this.scrollTo(this.state.active == this.props.items.length - 1 ? 0 : this.state.active + 1)
      setTimeout(this.loop, 5000)
    }
  }

  scrollTo (index) {
    this.setState({active: index, left: this.offset - index * this.itemWidth, a: $("body").prop("clientWidth")})
  }

  render () {
    var a = this.state.active
    return <Flex column noSelect>
      <Flex start1 relative wide={this.containerWidth} high={this.itemHeight} style={[{overflow: "hidden"}]}>
        {this.props.items.map((item, i) => <Flex onClick={() => this.scrollTo(i)} relative shrink={0} radius={3} key={i} bgImage={item.image} wide={this.itemWidth} high={this.itemHeight} style={[s.animate("all", 300), {left: this.state.left,backgroundPosition: "center center", backgroundSize: "cover", marginLeft: 15, marginRight: 15}]}>
          {a != i ? <Flex wide pointer high BG={s.t.dark(0.5)} radius={3}/> : <Flex end1 column high style={[{color: t.white, fontFamily: "Roboto"}]}>
            <Flex size={39} padding={30} style={{}}>{item.title}</Flex>
            <Flex size={20} wide={550} alignCenter style={{}}>{item.text1}</Flex>
            <Flex size={20} wide={550} alignCenter style={{}}>{item.text2}</Flex>
            <Button margin={40} paddingH={30} paddingV={13} size={20} radius={3} bgColor={"rgba(" + t.greenRgb + ", 0.5)"} activeBgColor={t.green} to={item.to} label={item.buttonLabel} border={"none"}/>
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
