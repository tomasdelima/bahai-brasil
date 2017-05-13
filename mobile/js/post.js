import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Animated,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

const Markdown = require('./markdown')
const s = require('./styles')
const Animation = require ('./animation')
const HumanDate = require('human-date')

module.exports = React.createClass({
  getInitialState() {
    var h = this.props.post.display == 'hidden'
    return {
      banner: Object.merge(s.post.banner, {
        height:  new Animated.Value(h ? 0 : 100),
        opacity: new Animated.Value(h ? 0 : 1),
      }),
      title: Object.merge(s.post.title, {
        fontSize: new Animated.Value(h ? 0 : 16),
        padding:  new Animated.Value(h ? 0 : 15),
        opacity:  new Animated.Value(h ? 0 : 1),
      }),
      date: Object.merge(s.post.date, {height: new Animated.Value(h ? 0 : 30)}),
      body: Object.merge(s.post.paragraph, {opacity: new Animated.Value(h ? 0 : 0)}),
    }
  },
  componentDidUpdate(prevProps, prevState) {
    if (this.props.post.display == 'hidden') {
      this.animateOpacity(0).then(() => {
        this.animateBanner(0)
        this.animateTitle(0, 0)
        this.animateDate(0)
        this.animateBody(0)
      })
    } else if (this.props.post.display == 'full') {
      this.animateOpacity(1)
      this.animateBanner(200)
      this.animateTitle(20, 25)
      this.animateDate(30)
      this.animateBody(1)
    } else {
      this.animateOpacity(1).then(() => {
        this.animateBanner(100)
        this.animateTitle(16, 15)
        this.animateDate(30)
        this.animateBody(0)
      })
    }
  },
  animateOpacity (opacity) {
    Animation.fast(this.state.title.opacity, opacity)
    return Animation.fast(this.state.banner.opacity, opacity)
  },
  animateBanner (height) {
    Animation.fast(this.state.banner.height, height)
  },
  animateTitle (fontSize, padding) {
    Animation.fast(this.state.title.fontSize, fontSize)
    Animation.fast(this.state.title.padding, padding)
  },
  animateBody (opacity) {
    Animation.fast(this.state.body.opacity, opacity)
  },
  animateDate (height) {
    Animation.fast(this.state.date.height, height)
  },
  renderBanner () {
    var p = this.props.post
    if (p.banner_url) {
      return <Animated.Image style={[this.state.banner]} repeatMode="contain" source={{uri: this.props.post.banner_url}} />
    } else {
      null
    }
  },
  renderTitleAndDate () {
    var p = this.props.post
    return <View style={[s.row, {alignItems: 'center'}]}>
      <Animated.Text style={[this.state.title]}>{p.title}</Animated.Text>
      <Animated.Text style={[this.state.date]}>{HumanDate.relativeTime(this.props.post.updated_at)}</Animated.Text>
    </View>
  },
  renderBody () {
    var p = this.props.post
    if (p.display == 'full') {
      return <View>
        {this.props.post.paragraphs.map((paragraph, i) => {
          var styles = [this.state.body]
          paragraph.style.split(/\s+/).map((style) => styles.push(s[style]))

          return <Markdown style={styles} key={i}>{paragraph.body}</Markdown>
        })}
        <Text style={[s.post.author, s.pagePadding]}>Editado por {this.props.post.author.name}</Text>
      </View>
    } else {
      return null
    }
  },
  render () {
    return <View style={[this.props.post.display == 'hidden' ? {} : s.post.container]} elevation={2}>
      {this.renderBanner()}
      {this.renderTitleAndDate()}
      {this.renderBody()}
    </View>
  },
})

