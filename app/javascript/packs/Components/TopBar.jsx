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
    return <Flex start1>
      <Flex absolute padding={20} top="0" left="0" right="0" id="topbar">
        <Link to="/" style={[s.noDecoration, s.size(0)].merge()}>
          <img src={images.logo} style={[s.wide(210)].merge()} onLoad={this.setHeight}/>
        </Link>

        <Flex marginH={15}>
          <TopBarButton color="red" to="foo" title="Bahá'ís no Brasil"/>
          <TopBarButton color="red" to="foo" title="Vida Espiritual"/>
          <TopBarButton color="red" to="foo" title="Transformando a Realidade Social"/>
          <TopBarButton color="red" to="foo" title="Notícias"/>
          <TopBarButton color="red" to="foo" title="Orações"/>
          <TopBarButton color="red" to="foo" title="Imprensa"/>
        </Flex>

        <TopBarButton color="red" to="foo" title="Contato" activeColor="white" background="green"/>
      </Flex>

      <Flex high={this.state.height} wide/>
    </Flex>
  }
}
