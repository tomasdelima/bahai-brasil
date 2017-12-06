import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Animated,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native'

import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import Foundation from 'react-native-vector-icons/Foundation'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Zocial from 'react-native-vector-icons/Zocial'
import Octicons from 'react-native-vector-icons/Octicons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

const s = require('./styles')

module.exports = React.createClass({
  scrollToTop () {
    global.scrollview.scrollTo({y: 0})
  },
  getInitialState() {
    return {refreshing: false, activeCategoryIndex: 0}
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
  scrollCategoriesBar () {
    var offsetX = Object.map(this.props.categories, (category, posts, j) => this.state.activeCategoryIndex > j ? this[category] : this.state.activeCategoryIndex == j ? this[category]/2 : 0).reduce((a, b) => a + b, 0)
    this.refs.scrollview.scrollTo({x: offsetX - s.Width / 2})
  },
  setActiveCategory (i, scroll) {
    if (this.state.activeCategoryIndex != i && !scroll) {
      setTimeout(() => {
        if (new Date () - this.lastScroll >= 10) {
          this.setState({activeCategoryIndex: i < 0 ? 0 : i})
        }
      }, 10)
    }

    if (scroll) {
      var offsetY = Object.map(this.props.categories, (category, posts, j) => i > j ? posts.height : 0).reduce((a, b) => a + b, 0)
      global.scrollview.scrollTo({y: offsetY + 20})
      this.setActiveCategory(i)
    }

    this.lastScroll = new Date ()
  },
  onScroll (event) {
    global.scrollOffset = event.nativeEvent.contentOffset.y
    var previousOffset = 0
    var activeCategoryIndex = Object.map(this.props.categories, (caterory, posts, i) => {
      previousOffset += posts.height
      return global.scrollOffset >= previousOffset - posts.height
    }).reduce((a, b) => a + b, -1)
    this.setActiveCategory(activeCategoryIndex)
  },
  renderSecondaryBar () {
    return <ScrollView horizontal showsHorizontalScrollIndicator={false} ref="scrollview"><View style={[s.navbar.categories]} onLayout={this.scrollCategoriesBar}>
      {Object.map(this.props.categories, (category, posts, i) => {
        var icon_library = {EvilIcons: EvilIcons, Ionicons: Ionicons, Entypo: Entypo, Foundation: Foundation, FontAwesome: FontAwesome, MaterialIcons: MaterialIcons, MaterialCommunityIcons: MaterialCommunityIcons, Zocial: Zocial, Octicons: Octicons, SimpleLineIcons: SimpleLineIcons}[posts[0].category.icon_library]

        return <TouchableOpacity key={i} style={[s.navbar.category.container]} onPress={() => this.setActiveCategory(i, true)} onLayout={(e) => this[category] = e.nativeEvent.layout.width}>
          <Text style={[s.navbar.category.icon,s.red2]}>
            {React.createElement(icon_library, {name: posts[0].category.icon_name, size: 25})}
          </Text>
          {this.state.activeCategoryIndex == i ? <Animated.Text style={[s.navbar.category.name]}>{category}</Animated.Text> : null}
        </TouchableOpacity>
      })}
    </View></ScrollView>
  },
  render () {
    if (this.props.onReturn) {
      this.leftIcon = <EvilIcons style={[s.navbar.sideButton]} size={40} name="chevron-left" />
      this.shareIcon = <Ionicons style={[s.navbar.sideButton]} size={25} name="md-share" />
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
      <View style={[s.navbar.container]}>
        <View style={[s.navbar.container2]}>
          <TouchableHighlight underlayColor={s.t.darkWater(0.8)} style={[s.navbar.sideContainer]} onPress={this.leftPress}>{this.leftIcon}</TouchableHighlight>
          <TouchableOpacity style={[s.navbar.center]} onPress={this.scrollToTop}><Text style={[s.navbar.title]}>{this.props.title}</Text></TouchableOpacity>
          <TouchableHighlight underlayColor={s.t.darkWater(0.8)} style={[s.navbar.sideContainer]} onPress={global.sharePost}>{this.shareIcon}</TouchableHighlight>
        </View>

        {!this.props.onReturn && this.renderSecondaryBar()}
      </View>

      <ScrollView style={[]} ref={(s) => global.scrollview = s} refreshControl={refreshControl} onScroll={this.onScroll} onTouchStart={() => global.userTouched = true}>
        {this.props.children}
      </ScrollView>
    </View>
  }
})
