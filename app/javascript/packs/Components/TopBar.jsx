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
    return <Flex start1 zindex={10}>
      <Flex absolute top="0" left="0" right="0" id="topbar" style={s.padding(31, 0)}>
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

      {/*<Flex high={this.state.height} wide/>*/}
    </Flex>
  }
}
