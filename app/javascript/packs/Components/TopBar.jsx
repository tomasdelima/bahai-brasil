import React from 'react'
import Optimized from '../Lib/Optimized'

export default class TopBar extends Optimized {
  initialize () {
    this.bind = ["setHeight", "setTop"]
    this.state = {top: 0, height: 0}
  }

  componentDidMount () {
    this.doc = $(document)
    this.setHeight()
    this.setTop()

    this.doc.on("scroll", this.setTop)
  }

  setHeight () {
    var height = document.getElementById("topbar").clientHeight
    this.setState({height: height})
  }

  setTop () {
    var windowTop = this.doc.scrollTop()
    var top = windowTop/4 - this.state.height

    if (top > 0) top = 0

    this.setState({
      top: top,
      bg: windowTop >= window.innerHeight + 9 ? s.bgImage(images.homepageBackground) : s.BG('transparent'),
    })
  }

  render () {
    return <Flex zindex={10} fixed top={this.state.top} left="0" right="0" id="topbar" style={[s.padding(31, 0)]}>
      <Flex zindex={11} start1>
        <Link to="/" style={[s.noDecoration, s.size(0)].merge()}>
          <img src={images.logo} style={[s.wide(210)].merge()} onLoad={this.setHeight}/>
        </Link>

        <Flex style={s.margin(0, 15)}>
          <TopBarButton to="foo" title="Bahá'ís no Brasil"/>
          <TopBarButton to="foo" title="Vida Espiritual"/>
          <TopBarButton to="foo" title="Transformando a Realidade Social"/>
          <TopBarButton to="foo" title="Notícias"/>
          <TopBarButton to="foo" title="Orações"/>
          <TopBarButton to="foo" title="Imprensa"/>
        </Flex>

        <TopBarButton to="foo" title="Contato" activeColor="white" background="green" style={s.padding(10, 27)}/>
      </Flex>

      <Flex absolute top={this.state.top} left={0} right={0} high={this.state.height} opacity={0.7} style={[this.state.bg]}/>
    </Flex>
  }
}
