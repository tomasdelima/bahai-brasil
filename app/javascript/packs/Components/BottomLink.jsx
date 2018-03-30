import React from 'react'
import Optimized from '../Lib/Optimized'

export default class BottomLink extends Optimized {
  initialize () {
    this.bind = ["setButtonColor"]
    this.state = {buttonColor: "transparent"}
  }
  componentWillMount() {}
  componentDidMount() {}
  componentWillReceiveProps (nextProps) {}
  shouldComponentUpdate (nextProps, nextState) {return true}
  componentWillUpdate (nextProps, nextState) {}
  componentDidUpdate (prevProps, prevState) {}
  componentWillUnmount () {}
  componentDidCatch (prevProps, prevState) {}

  setButtonColor (color) {
    this.setState({buttonColor: color})
  }

  render () {
    return <Flex column>
      <img src={this.props.icon} style={s.margin(0, 0, 15)}/>

      <Flex margin={15} size={19} radius={4} BG={this.state.buttonColor} onMouseEnter={() => this.setButtonColor(t.green)} onMouseLeave={() => this.setButtonColor("transparent")} style={[s.animate("all", 300), {border: "2px solid rgba(" + t.greenRgb + ", 0.5)", color: t.white, fontFamily: 'Roboto'}]}>
        <Link to={this.props.to} style={[s.padding(10, 35), s.noDecoration, {color: t.white}].merge()}>
          {this.props.label}
        </Link>
      </Flex>
    </Flex>
  }
}
