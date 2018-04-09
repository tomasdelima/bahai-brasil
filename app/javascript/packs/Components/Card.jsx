import React from 'react'
import Optimized from '../Lib/Optimized'

export default class Banner extends Optimized {
  initialize () {
    this.bind = ["toogleShadow"]
    this.state = {shadow: 0}
  }

  toogleShadow () {
    if (this.props.to) this.setState({shadow: 4 - this.state.shadow})
  }

  renderBody () {
    return <Flex column>
      <img src={this.props.image} style={[s.wide(), {borderRadius: "5px 5px 0 0"}].merge()}/>
      <Flex text column padding={40} alignCenter>
        <Flex color={t.black} size={20} style={s.margin(0, 0, 13)}>{this.props.title}</Flex>
        <Flex color={t.gray} size={16}>{this.props.body}</Flex>
      </Flex>
    </Flex>
  }

  render () {
    var sd = this.state.shadow

    return <Flex column pointer={this.props.to} radius={5} margin={this.props.margin} style={[s.animate("all", 300), {boxShadow: sd + "px " + sd + "px " + 4*sd + "px #ccc"}]} onMouseEnter={this.toogleShadow} onMouseLeave={this.toogleShadow}>
      {this.props.to ? <Link to={this.props.to} style={s.noDecoration}>{this.renderBody()}</Link> : this.renderBody()}
    </Flex>
  }
}
