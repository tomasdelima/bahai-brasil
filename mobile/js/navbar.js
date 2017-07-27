import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import Ionicon from 'react-native-vector-icons/Ionicons'

const s = require('./styles')

module.exports = React.createClass({
  scrollToTop () {
    global.scrollview.scrollTo({y: 0})
  },
  getInitialState() {
    return {refreshing: false}
  },
  onRefresh () {
    var t = new Date()
    global.db.log('REFRESH:')
    this.setState({refreshing: true})
    this.props.onRefresh().then(() => {
      this.setState({refreshing: false})
      t = new Date() - t
      global.db.log('REFRESH: ' + t/1000 + ' seconds')
    })
  },
  leftPress () {
    if (this.props.onReturn) {
      this.props.onReturn()
    }
  },
  render () {
    if (this.props.onReturn) {
      this.leftIcon = <EvilIcon style={[s.navbar.sideButton]} size={40} name="chevron-left" />
      this.shareIcon = <Ionicon style={[s.navbar.sideButton]} size={25} name="md-share" />
    } else {
      this.leftIcon = <Image source={require('../images/white512.png')} style={[s.navbar.logo]}/>
      this.shareIcon = <Text/>
    }

    var refreshControl = <RefreshControl
      refreshing={this.state.refreshing}
      onRefresh={this.onRefresh}
      colors={[s.t.water(1)]}
      progressBackgroundColor={'white'}
    />

    return <View>
      <View style={[s.navbar.container, s.row]}>
        <TouchableHighlight underlayColor={s.t.darkWater(0.8)} style={[s.navbar.sideContainer]} onPress={this.leftPress}>{this.leftIcon}</TouchableHighlight>
        <TouchableOpacity style={[s.navbar.center]} onPress={this.scrollToTop}><Text style={[s.navbar.title]}>{this.props.title}</Text></TouchableOpacity>
        <TouchableHighlight underlayColor={s.t.darkWater(0.8)} style={[s.navbar.sideContainer]} onPress={global.sharePost}>{this.shareIcon}</TouchableHighlight>
      </View>

      <ScrollView style={[]} ref={(s) => global.scrollview = s} refreshControl={refreshControl} onScroll={(e) => global.scrollOffset = e.nativeEvent.contentOffset.y} onTouchStart={() => global.userTouched = true}>
        {this.props.children}
      </ScrollView>
    </View>
  }
})
