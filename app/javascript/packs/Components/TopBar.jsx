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
    return <Flex margin={15} spacedOut wrap style={[m ? s.column : s.row]}>
      {pages.map((page, i) => <TopBarButton key={page.title} to={page.slug} title={page.title}/>)}
    </Flex>
  }

  render () {
    return <Flex size="0">
      <Flex fixed id="topbar" spacedIn wrap zindex={11} wide top={0} left={0} style={[m ? s.column : s.row, s.padding(31, 0), s.bgImage(images.homepageBackground)]}>
        <Flex spacedIn style={[s.margin(0, 0, 0, 50), m && s.wide()]}>
          <Link to="/" style={[s.noDecoration, s.size(0)].merge()}>
            <img src={images.logo} style={[s.wide(m ? 300 : 210)].merge()} onLoad={this.setHeight}/>
          </Link>

          {m && <Flex color={t.white} className="fa fa-bars" size={60} onClick={this.toogleMenu} style={s.margin(0, 50, 0, 0)}/>}
        </Flex>

        {(!m || this.state.showMenu) && this.renderMenu()}
        {(!m || this.state.showMenu) && <Flex style={s.margin(0, m ? 0 : 50, 0, 0)} wrap>
          <TopBarButton to="foo" title="Contato" activeColor="white" background="green" style={s.padding(10, 27)}/>
        </Flex>}
      </Flex>

      {!this.props.overlay && <Flex high={this.state.height}/>}
    </Flex>
  }
}
