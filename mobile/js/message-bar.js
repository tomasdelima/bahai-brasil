import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  Animated,
} from 'react-native'

import Icon from 'react-native-vector-icons/EvilIcons'

const Markdown = require('./markdown')
const s = require('./styles')
const HumanDate = require('human-date')

module.exports = React.createClass({
  getInitialState() {
    return {height: new Animated.Value(0)}
  },
  setHeight (height) {
    Animated.timing(this.state.height, {
      toValue: height,
      duration: 300,
    }).start()
  },
  show () {
    this.setHeight(20)
    this.setState({hide: false})
    if (this.props.message.timeout) setTimeout(this.hide, this.props.message.timeout)
  },
  hide () { this.setHeight(0) },
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.message != this.props.message) {
      this.show()
    }
  },
  render () {
    var message = this.props.message || {}
    return message.body ? <Animated.View style={[s.message.container, s.message[message.type], {height: this.state.height}]}>
      <Text style={[s.message.body]}>{message.body}</Text>
      {message.timeout ? null : <TouchableHighlight style={[s.message.close]} underlayColor='rgba(0, 0, 0, 0.1)' onPress={this.hide}>
        <Icon name="close" size={15}/>
      </TouchableHighlight>}
    </Animated.View> : null
  }
})

