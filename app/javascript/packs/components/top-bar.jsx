import React from 'react'
import {Link} from 'react-router-dom'

export default class TopBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {opacity: !this.props.transition + 0}
    this.fadeTopBar = this.fadeTopBar.bind(this)
  }

  componentDidMount() {
    if (this.props.transition) window.addEventListener('scroll', this.fadeTopBar)
    this.setState({height: this.props.transition ? 0 : $(this.refs.bar).height()})
  }

  componentWillUnmount() {
    if (this.props.transition) window.removeEventListener('scroll', this.fadeTopBar)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.transition != nextProps.transition) {
      if (nextProps.transition) {
        window.addEventListener('scroll', this.fadeTopBar)
        this.setState({opacity: 0, top: -10, height: 0})
      } else {
        if (this.props.transition) window.removeEventListener('scroll', this.fadeTopBar)
        this.setState({opacity: 1, top: 0, height: $(this.refs.bar).height()})
      }
    }
  }

  fadeTopBar (event) {
    var top = event.target.body.scrollTop
    this.setState({opacity: top/100, top: Math.min(top/10 - 10, 0)})
  }

  render () {
    var textStyles = [s.noDecoration, s.white, s.padding(10)].merge()

    return <div style={s.wide()}>
      <div ref="bar" style={[s.fixed, s.opacity(this.state.opacity), s.top(this.state.top), s.flex, s.spacedIn, s.wide(), s.darkWaterBG, s.breeSerif, s.zindex(1)].merge()} id="top-bar">
        <div style={s.flex}>
          <img src={logoWhite} style={[s.square(35), s.padding(5)].merge()}/>
          {global.pages.filter(p => p.appears_on_menu).map((page, bar) => <Link key={bar} to={"/" + page.slug + window.location.hash} style={textStyles}>{page.title}</Link>)}
        </div>

        <div style={s.flex}>
          <span style={textStyles}>{(user || {}).email}</span>
        </div>
      </div>

      <div style={s.high(this.state.height)}/>
    </div>
  }
}
