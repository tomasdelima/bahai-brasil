import React, { Component } from 'react'
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';
const s = require('./styles')

module.exports = React.createClass({
  goToReturn () {
    global.scenes.pop()
  },
  scrollToTop () {
    this.scrollview.scrollTo({y: 0})
  },
  componentWillMount() {
    this.returnIcon = global.scenes.getCurrentRoutes().length > 1 ? <Icon style={[s.navbar.return]} size={25} name="chevron-left" /> : null
  },
  render () {
    return <View>
      <View style={[s.navbar.container, s.row]}>
        <TouchableOpacity style={[s.navbar.left]} onPress={this.goToReturn}>{this.returnIcon}</TouchableOpacity>
        <TouchableOpacity style={[s.navbar.center]} onPress={this.scrollToTop}><Text style={[s.navbar.title]}>{this.props.title}</Text></TouchableOpacity>
        <Text style={[s.navbar.right]}></Text>
      </View>
      <ScrollView ref={(s) => this.scrollview = s}>
        {this.props.children}
      </ScrollView>
    </View>
  }
})

