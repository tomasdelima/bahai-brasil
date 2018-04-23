import React from 'react'
import Optimized from '../Lib/Optimized'

export default class TopBar extends Optimized {
  initialize () {
    this.bind = ["setHeight", "toggleMenu", "toggleContacts", "calculateTop"]
    this.state = {overlayHeight: 0, top: this.props.scroll ? -1000 : 0}
    global.topbar = this
  }

  componentDidMount () {
    if (this.props.scroll) {
      $("#topbar img").on("load", this.calculateTop)
      $(document).on("scroll", this.calculateTop)
    }
  }

  componentWillUnmount () {
    $(document).off("scroll")
  }

  calculateTop () {
    var windowTop = $(window).scrollTop()/3
    if (windowTop <= this.state.overlayHeight) this.setState({top: windowTop - this.state.overlayHeight})
    else this.setState({top: 0})
  }

  setHeight () {
    this.setState({overlayHeight: document.getElementById("topbar").clientHeight})
  }

  toggleMenu () {
    this.setState({showMenu: !this.state.showMenu}, this.setHeight)
  }

  toggleContacts () {
    this.setState({showContacts: !this.state.showContacts})
  }

  renderMenu () {
    return <Flex margin={15} spacedOut wrap style={[m ? s.column : s.row]}>
      {pages.map((page, i) => <TopBarButton key={page.title} to={page.slug} title={page.title} subPages={page.sub_pages}/>)}
    </Flex>
  }

  render () {
    return <Flex size="0">
      <Flex fixed id="topbar" spacedIn wrap zindex={11} wide top={this.state.top} left={0} style={[m ? s.column : s.row, s.padding(31, 0), this.props.bg ? s.BG(this.props.bg) : s.bgImage(images.homepageBackground)]}>
        <Flex spacedIn style={[s.margin(0, 0, 0, 50), m && s.wide()]}>
          <Link to="/" style={[s.noDecoration, s.size(0)].merge()}>
            <img src={images.logo} style={[s.wide(m ? 300 : 210)].merge()} onLoad={this.setHeight}/>
          </Link>

          {m && <Flex color={t.white} className="fa fa-bars" size={60} onClick={this.toggleMenu} style={s.margin(0, 50, 0, 0)}/>}
        </Flex>

        {(!m || this.state.showMenu) && this.renderMenu()}
        {(!m || this.state.showMenu) && <Flex style={s.margin(0, m ? 0 : 50, 0, 0)} wrap>
          <TopBarButton onClick={this.toggleContacts} title="Contato" activeColor="white" background="green" style={s.padding(10, 27)}/>
        </Flex>}
      </Flex>

      <Contact show={this.state.showContacts} onClose={this.toggleContacts}/>

      {!this.props.overlay && <Flex high={this.state.overlayHeight}/>}
    </Flex>
  }
}
