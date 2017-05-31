import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Animated,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Button,
  Modal,
  PanResponder,
} from 'react-native'
import Gallery from 'react-native-gallery'
import EvilIcon from 'react-native-vector-icons/EvilIcons'

const Markdown = require('./markdown')
const s = require('./styles')
const Animation = require ('./animation')
const HumanDate = require('human-date')

module.exports = React.createClass({
  getInitialState() {
    this.lastTop = 0
    this.lastLeft = 0
    this.animation = new Animation(1, [0, 1, 2])

    return {
      banner: Object.merge(s.post.banner.image, {
        height: this.animation.interpolate([0, 100, 200]),
        opacity: this.animation.value,
      }),
      title: Object.merge(s.post.title, {
        fontSize: this.animation.interpolate([0, 16, 20]),
        height:   this.animation.interpolate([0, 40, 50]),
        margin:   this.animation.interpolate([0, 15, 25]),
        opacity:  this.animation.value,
      }),
      date: Object.merge(s.post.date, {height: this.animation.interpolate([0, 30, 30])}),
      body: Object.merge(s.post.paragraph, {opacity: this.animation.interpolate([0, 0, 1])}),
    }
  },
  componentWillMount() {
    this.images = [this.props.post.banner_url, ...Markdown.getImages(this.props.post.paragraphs.map((a)=>a.body).join(''))].compact()
  },
  componentDidMount() {
    Image.getSize(this.props.post.banner_url, (width, height) => {
      var ratio = height/width
      this.setState({ratio: ratio})
    }, () => {})
  },
  componentWillUpdate(prevProps, prevState) {
    var borderRadius = this.props.post.display == 'full' ? 0 : s.post.container.borderRadius
    this.state.banner.borderTopLeftRadius = borderRadius
    this.state.banner.borderTopRightRadius = borderRadius
  },
  componentDidUpdate(prevProps, prevState) {
    var display = this.props.post.display

    if (display == 'hidden') {
      this.animation.fast(0)
    } else if (display == 'full') {
      this.animation.fast(2)
    } else {
      this.animation.fast(1)
    }
  },
  renderBanner () {
    var p = this.props.post
    if (p.banner_url) {
      var onBannerPress = () => p.display != 'full' ? global.goToPostAndScroll(p) : this.setState({showGallery: true})

      return <View style={[s.post.banner.container]}>
        <TouchableWithoutFeedback onPress={onBannerPress}>
          <Animated.Image style={[this.state.banner]} repeatMode="contain" source={{uri: p.banner_url}} />
        </TouchableWithoutFeedback>

        {this.renderGallery()}
      </View>
    } else {
      null
    }
  },
  renderGallery () {
    return <Modal animationType={"slide"} transparent={true} visible={!!this.state.showGallery} onRequestClose={() => this.setState({showGallery: false})}>
      <Gallery initialPage={this.state.imageCounter} pageMargin={10} style={[s.post.gallery.container]} images={this.images} />
      <EvilIcon style={[s.post.gallery.back]} size={60} name="chevron-left" onPress={() => this.setState({showGallery: false})} />
    </Modal>
  },
  renderTitleAndDate () {
    var p = this.props.post
    return <View style={[s.row, {alignItems: 'center'}]}>
      <Animated.Text style={[this.state.title]}>{p.title}</Animated.Text>
      <Animated.Text style={[this.state.date]}>{HumanDate.relativeTime(p.updated_at)}</Animated.Text>
    </View>
  },
  renderBody () {
    if (this.props.post.display == 'full') {
      return <View>
        {this.props.post.paragraphs.map((paragraph, i) => {
          var styles = [this.state.body]
          paragraph.style.split(/\s+/).map((style) => styles.push(s[style]))

          return <Markdown style={styles} key={i} onImagePress={(imageCounter) => this.setState({showGallery: true, imageCounter: imageCounter})}>{paragraph.body}</Markdown>
        })}
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

