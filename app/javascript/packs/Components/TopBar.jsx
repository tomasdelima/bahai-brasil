import React from 'react'
import Optimized from '../Lib/Optimized'

export default class TopBar extends Optimized {
  initialize () {
    this.bind = ["setHeight", "toogleMenu"]
    this.state = {height: 0}
    global.topbar = this
  }

  setHeight () {
    this.height = document.getElementById("topbar").clientHeight
    this.setState({height: this.height})
  }

  toogleMenu () {
    this.setState({showMenu: !this.state.showMenu}, this.setHeight)
  }

  renderMenu () {
    return <Flex style={[s.margin(0, 15), s.spacedOut, s.animate("all", 1000)]} wrap>
      <TopBarButton to="foo" title="Bahá'ís no Brasil"/>
      <TopBarButton to="/vida-espiritual" title="Vida Espiritual"/>
      <TopBarButton to="foo" title="Transformando a Realidade Social"/>
      <TopBarButton to="foo" title="Notícias"/>
      <TopBarButton to="foo" title="Orações"/>
      <TopBarButton to="foo" title="Imprensa"/>
      <TopBarButton to="foo" title="Contato" activeColor="white" background="green" style={s.padding(10, 27)}/>
    </Flex>
  }

  render () {
    var m = s.isMobile()

    return <Flex size="0">
      <Flex fixed id="topbar" wrap zindex={11} wide top={0} style={[s.padding(31, 0), s.bgImage(images.homepageBackground)]}>
        <Flex spacedIn style={[s.margin(0, 50), m && s.wide()]}>
          <Link to="/" style={[s.noDecoration, s.size(0)].merge()}>
            <img src={images.logo} style={[s.wide(m ? 300 : 210)].merge()} onLoad={this.setHeight}/>
          </Link>

          {m && <Flex color={t.white} className="fa fa-bars" size={60} onClick={this.toogleMenu}/>}
        </Flex>

        {(!m || this.state.showMenu) && this.renderMenu()}
      </Flex>

      {!this.props.overlay && <Flex high={this.state.height}/>}
    </Flex>
  }
}
