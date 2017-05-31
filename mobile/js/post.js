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

    var p = this.props.post
    var h = p.display == 'hidden'
    return {
      banner: Object.merge(s.post.banner.image, {
        height:  new Animated.Value(h ? 0 : 100),
        opacity: new Animated.Value(h ? 0 : 1),
      }),
      title: Object.merge(s.post.title, {
        fontSize: new Animated.Value(h ? 0 : 16),
        height:   new Animated.Value(h ? 0 : 40),
        margin:   new Animated.Value(h ? 0 : 15),
        opacity:  new Animated.Value(h ? 0 : 1),
      }),
      date: Object.merge(s.post.date, {height: new Animated.Value(h ? 0 : 30)}),
      body: Object.merge(s.post.paragraph, {opacity: new Animated.Value(h ? 0 : 0)}),
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
    if (this.props.post.display == 'hidden') {
      this.animateOpacity(0).then(() => {
        this.animateBanner(0)
        this.animateTitle(0, 0, 0)
        this.animateDate(0)
        this.animateBody(0)
      })
    } else if (this.props.post.display == 'full') {
      this.animateOpacity(1)
      this.animateBanner(200)
      this.animateTitle(20, 50, 25)
      this.animateDate(30)
      this.animateBody(1)
    } else {
      this.animateOpacity(1).then(() => {
        this.animateBanner(100)
        this.animateTitle(16, 40, 15)
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
  animateTitle (fontSize, height, margin) {
    Animation.fast(this.state.title.fontSize, fontSize)
    Animation.fast(this.state.title.height, height)
    Animation.fast(this.state.title.margin, margin)
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
      <Gallery pageMargin={10} style={[s.post.gallery.container]} images={this.images} />
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

          return <Markdown style={styles} key={i}>{paragraph.body}</Markdown>
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

