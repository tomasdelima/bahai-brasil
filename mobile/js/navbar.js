import React, { Component } from 'react'
import {
  Text,
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';
const s = require('./styles')
const DB = require('./db')

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
  componentDidMount() {
  },
  getInitialState() {
    return {refreshing: false}
  },
  onRefresh () {
    var t = new Date()
    if (DB.shouldLog) console.log('REFRESH:')
    this.setState({refreshing: true})
    this.props.onRefresh().then(() => {
      this.setState({refreshing: false})
      t = new Date() - t
      if (DB.shouldLog) console.log('REFRESH: ' + t/1000 + ' seconds')
    })
  },
  render () {
    var refreshControl = <RefreshControl
      refreshing={this.state.refreshing}
      onRefresh={this.onRefresh}
      colors={['#500', '#050', '#005']}
      progressBackgroundColor="#FFF"
    />

    return <View>
      <View style={[s.navbar.container, s.row]}>
        <TouchableOpacity style={[s.navbar.left]} onPress={this.goToReturn}>{this.returnIcon}</TouchableOpacity>
        <TouchableOpacity style={[s.navbar.center]} onPress={this.scrollToTop}><Text style={[s.navbar.title]}>{this.props.title}</Text></TouchableOpacity>
        <Text style={[s.navbar.right]}></Text>
      </View>

      <ScrollView style={[]} ref={(s) => this.scrollview = s} refreshControl={refreshControl}>
        {this.props.children}
      </ScrollView>
    </View>
  }
})

