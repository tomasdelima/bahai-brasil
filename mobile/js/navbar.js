import React, { Component } from 'react'
import {
  Text,
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import Ionicon from 'react-native-vector-icons/Ionicons'

const s = require('./styles')
const DB = require('./db')

module.exports = React.createClass({
  scrollToTop () {
    global.scrollview.scrollTo({y: 0})
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
    if (this.props.onReturn) {
      this.returnIcon = <EvilIcon style={[s.navbar.return]} size={40} name="chevron-left" />
      this.shareIcon = <Ionicon style={[s.navbar.return]} size={25} name="md-share" />
    } else {
      this.returnIcon = null
      this.shareIcon = null
    }

    var refreshControl = <RefreshControl
      refreshing={this.state.refreshing}
      onRefresh={this.onRefresh}
      colors={['#500', '#050', '#005']}
      progressBackgroundColor="#FFF"
    />

    return <View>
      <View style={[s.navbar.container, s.row]}>
        <TouchableOpacity style={[s.navbar.left]} onPress={this.props.onReturn}>{this.returnIcon}</TouchableOpacity>
        <TouchableOpacity style={[s.navbar.center]} onPress={this.scrollToTop}><Text style={[s.navbar.title]}>{this.props.title}</Text></TouchableOpacity>
        <TouchableOpacity style={[s.navbar.right]} onPress={global.sharePost}>{this.shareIcon}</TouchableOpacity>
      </View>

      <ScrollView style={[]} ref={(s) => global.scrollview = s} refreshControl={refreshControl} onScroll={(e) => global.scrollOffset = e.nativeEvent.contentOffset.y} onTouchStart={() => global.userTouched = true}>
        {this.props.children}
      </ScrollView>
    </View>
  }
})
