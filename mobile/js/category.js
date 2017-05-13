import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Button,
  Animated,
} from 'react-native'

const Post = require('./post')
const s = require('./styles')
const Animation = require ('./animation')

module.exports = React.createClass({
  getInitialState() {
    this.showing = 5

    return {
      container: Object.merge(s.category.container, {
        margin: new Animated.Value(20),
      }),
      name: Object.merge(s.category.name, {
        fontSize: new Animated.Value(18),
        opacity:  new Animated.Value(1),
      }),
      posts: this.getPostsFromProps(),
      showMore: Object.merge(s.category.showMore, {
        fontSize: new Animated.Value(this.props.posts.length > this.showing ? 15 : 0),
        padding: new Animated.Value(this.props.posts.length > this.showing ? 5 : 0),
      }),
    }
  },
  getPostsFromProps () {
    return this.props.posts.map((p, i) => {p.display = i < this.showing ? p.display : 'hidden'; return p})
  },
  componentWillReceiveProps(nextProps) {
    this.state.posts = this.getPostsFromProps()

    if (nextProps.posts.filter((p) => !p.display || p.display == 'inline').length > 0) {
      Animation.fast(this.state.container.margin, 20)
      Animation.fast(this.state.name.fontSize, 18)
      Animation.fast(this.state.name.opacity, 1)
    } else {
      Animation.fast(this.state.container.margin, 0)
      Animation.fast(this.state.name.fontSize, 0)
      Animation.fast(this.state.name.opacity, 0)
    }
    this.forceUpdate()
  },
  showMore () {
    this.showing += 5
    this.state.posts.map((p, i) => {p.display = i < this.showing ? 'inline' : 'hidden'})
    this.forceUpdate()
    if (this.state.posts.length <= this.showing) {
      Animation.fast(this.state.showMore.padding, 0)
      Animation.fast(this.state.showMore.fontSize, 0)
    }
  },
  render () {
    return <Animated.View style={[this.state.container]}>
      <Animated.Text style={[this.state.name]}>{this.props.name}</Animated.Text>
      {this.state.posts.map((post, i) =>
        <TouchableOpacity key={i} activeOpacity={0.8} onPress={() => global.goToPostAndScroll(post)}>
          <Post post={post} />
        </TouchableOpacity>
      )}
      <Animated.Text style={[s.red,this.state.showMore]} onPress={this.showMore}>Mostrar mais</Animated.Text>
    </Animated.View>
  },
})


