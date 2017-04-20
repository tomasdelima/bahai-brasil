import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native'

const Markdown = require('./markdown')
const s = require('./styles')
const HumanDate = require('human-date')

module.exports = React.createClass({
  goToPost () {
    global.scenes.push({id: 'post', post: this.props.post, title: this.props.post.title})
  },
  renderInline () {
    var banner = this.props.post.banner_url ? <Image style={[s.post.inline.banner]} repeatMode="contain" source={{uri: this.props.post.banner_url}} /> : null
    return <TouchableOpacity activeOpacity={0.8} style={[s.post.inline.container]} onPress={this.goToPost} elevation={5}>
      {banner}
      <Text style={[s.post.inline.title]}>{this.props.post.title}</Text>
      <View style={[s.row]}>
        <Text style={[s.post.inline.author]}>{this.props.post.author.name}</Text>
        <Text style={[s.post.inline.date]}>{HumanDate.relativeTime(this.props.post.updated_at)}</Text>
      </View>
    </TouchableOpacity>
  },
  renderFull () {
    return <View style={[s.post.full.container]}>
      <Text style={[s.post.full.title]}>{this.props.post.title}</Text>
      {this.props.post.paragraphs.map((paragraph, i) => {
        var styles = [s.post.full.paragraph]
        paragraph.style.split(/\s+/).map((style) => styles.push(s[style]))

        return <Markdown style={styles} key={i}>{paragraph.body}</Markdown>
      })}
      <Text style={[s.post.full.author, s.pagePadding]}>— {this.props.post.author.name}</Text>
    </View>
  },
  render () {
    return this.props.inline ? this.renderInline() : this.renderFull()
  }
})

