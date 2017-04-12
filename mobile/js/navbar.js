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
  scrollToTop () {
    this.scrollview.scrollTo({y: 0})
  },
  render () {
    return <View>
      <View style={[s.navbar.container, s.row]}>
        <TouchableOpacity style={[s.navbar.left,s.red]} onPress={this.goToReturn}><Text style={[s.navbar.return]}>Return</Text></TouchableOpacity>
        <TouchableOpacity style={[s.navbar.center]} onPress={this.scrollToTop}><Text style={[s.navbar.title]}>{this.props.title}</Text></TouchableOpacity>
        <Text style={[s.navbar.right]}></Text>
      </View>
      <ScrollView ref={(s) => this.scrollview = s}>
        {this.props.children}
      </ScrollView>
    </View>
  }
})

