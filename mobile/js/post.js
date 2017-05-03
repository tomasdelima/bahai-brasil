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
    return {
      banner: {
        height: new Animated.Value(100),
        opacity: new Animated.Value(1),
      },
      title: {
        fontSize: new Animated.Value(16),
        margin: new Animated.Value(15),
      },
      categoryAndDate: {height: new Animated.Value(30)},
      body: {opacity: new Animated.Value(0)}
    }
  },
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.post.display == 'hidden') {
      this.animateBanner(0, 0)
      this.animateTitle(0, 0)
      this.animateCategoryAndDate(0)
      this.animateBody(0)
    } else if (this.props.post.display == 'full') {
      this.animateBanner(200, 1)
      this.animateTitle(20, 25)
      this.animateCategoryAndDate(30)
      this.animateBody(1)
    } else {
      this.animateBanner(100, 1)
      this.animateTitle(16, 15)
      this.animateCategoryAndDate(30)
      this.animateBody(0)
    }
  },
  animateBanner (height, opacity) {
    Animation.medium(this.state.banner.height, height)
    Animation.fast(this.state.banner.opacity, opacity)
  },
  animateTitle (fontSize, margin) {
    Animation.fast(this.state.title.fontSize, fontSize)
    Animation.fast(this.state.title.margin, margin)
  },
  animateBody (opacity) {
    Animation.fast(this.state.body.opacity, opacity)
  },
  animateCategoryAndDate (height) {
    Animation.fast(this.state.categoryAndDate.height, height)
  },
  renderBanner () {
    var p = this.props.post
    if (p.banner_url) {
      return <Animated.Image style={[s.post.banner, this.state.banner]} repeatMode="contain" source={{uri: this.props.post.banner_url}} />
    } else {
      null
    }
  },
  renderTitle () {
    var p = this.props.post
    return <Animated.Text style={[this.state.title]}>{p.title}</Animated.Text>
  },
  renderCategoryAndDate() {
    return <Animated.View style={[s.row, this.state.categoryAndDate]}>
      <Text style={[s.post.category]}>{this.props.post.category}</Text>
      <Text style={[s.post.division]}>⚫</Text>
      <Text style={[s.post.date]}>{HumanDate.relativeTime(this.props.post.updated_at)}</Text>
    </Animated.View>
  },
  renderBody () {
    var p = this.props.post
    if (p.display == 'full') {
      return <View>
        {this.props.post.paragraphs.map((paragraph, i) => {
          var styles = [this.state.body, s.post.paragraph]
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
      {this.renderTitle()}
      {this.renderCategoryAndDate()}
      {this.renderBody()}
    </View>
  },
})

