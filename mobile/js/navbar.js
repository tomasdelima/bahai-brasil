import React, { Component } from 'react'
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native'

const s = require('./styles')

module.exports = React.createClass({
  goToReturn () {
    global.scenes.pop()
  },
  render () {
    return <View>
      <View style={[s.navbar.container, s.row]}>
        <TouchableOpacity style={[s.navbar.left,s.red]} onPress={this.goToReturn}><Text style={[s.navbar.return]}>Return</Text></TouchableOpacity>
        <Text style={[s.navbar.title]}>{this.props.title}</Text>
        <Text style={[s.navbar.right]}></Text>
      </View>
      {this.props.children}
    </View>
  }
})

