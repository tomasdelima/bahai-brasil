import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Button,
  Animated,
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

const Post = require('./post')
const s = require('./styles')
const Animation = require ('./animation')

module.exports = React.createClass({
  getInitialState() {
    this.showingIncrement = 5
    this.showing = 0 + this.showingIncrement
    this.animation = new Animation(1, [0, 1])
    this.showMoreAnimation = new Animation(1, [0, 1])

    return {
      container: Object.merge(s.category.container, {
        margin: this.animation.interpolate([0, 10]),
      }),
      container2: Object.merge(s.category.container2, {
        marginBottom: this.animation.interpolate([0, 15]),
      }),
      name: Object.merge(s.category.name, {
        fontSize:  this.animation.interpolate([0, 20]),
        maxHeight: this.animation.interpolate([0, 100]),
        opacity:   this.animation.interpolate([0, 1]),
      }),
      posts: this.getPostsFromProps(),
      showMore: Object.merge(s.category.showMore, {height: this.showMoreAnimation.interpolate([0, this.showMoreHeight()])}),
    }
  },
  getPostsFromProps (nextProps) {
    return (nextProps||this.props).posts.map((p, i) => {p.display = i < this.showing ? p.display : 'hidden'; return p})
  },
  componentWillReceiveProps(nextProps) {
    this.state.posts = this.getPostsFromProps(nextProps)
    this.state.allPostsAreInline = nextProps.posts.filter((p) => !p.display || p.display == 'inline').length > 0

    if (this.state.allPostsAreInline) {
      this.animation.fast(1)
      this.showMoreAnimation.fast(this.state.posts.length <= this.showing ? 0 : 1)
    } else {
      this.animation.fast(0)
      this.showMoreAnimation.fast(0)
    }
    this.forceUpdate()
  },
  showMore () {
    this.showing += this.showingIncrement
    this.state.posts.map((p, i) => {p.display = i < this.showing ? 'inline' : 'hidden'})
    this.forceUpdate()
    if (this.state.posts.length <= this.showing) {
      this.showMoreAnimation.fast(0)
    }
  },
  showMoreHeight (props) {
    return (props || this.props).posts.length > this.showing ? 30 : 0
  },
  render () {
    if (this.state.allPostsAreInline && this.props.category.icon_library && this.props.category.icon_name) {
      var icon_library = {EvilIcons: EvilIcons, Ionicons: Ionicons, Entypo: Entypo, Foundation: Foundation, FontAwesome: FontAwesome, MaterialIcons: MaterialIcons, MaterialCommunityIcons: MaterialCommunityIcons, Zocial: Zocial, Octicons: Octicons, SimpleLineIcons: SimpleLineIcons}[this.props.category.icon_library]
      var icon = <Animated.Text style={[s.category.icon]}>
        {React.createElement(icon_library, {name: this.props.category.icon_name, size: 25})}
      </Animated.Text>
    } else {
      var icon = null
    }

    return <Animated.View style={[this.state.container]}>
      <Animated.View style={[this.state.container2]}>
        {icon}
        <Animated.Text style={[this.state.name]}>{this.props.category.name}</Animated.Text>
      </Animated.View>

      {this.state.posts.map((post, i) =>
        <TouchableOpacity key={i} activeOpacity={0.8} onPress={() => global.goToPostAndScroll(post)}>
          <Post post={post} />
        </TouchableOpacity>
      )}
      <Animated.Text style={[this.state.showMore]} onPress={this.showMore}>Mais notícias</Animated.Text>
    </Animated.View>
  },
})


