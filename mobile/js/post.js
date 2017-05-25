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
      zoomedBanner: {width: s.Width},
      zoomedBannerPosition: {top: 0, left: 0},
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
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        this.lastPressed = new Date()
      },
      onPanResponderMove: (evt, gestureState) => {
        this.moveImageTo(this.lastTop + gestureState.dy, this.lastLeft + gestureState.dx)
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx + gestureState.dy == 0) {
          if (new Date() - this.lastReleased < 400) {
            this.zoomBanner(4 - this.state.scale, gestureState.y0, gestureState.x0)
          }

          this.lastReleased = new Date()
        }

        var z = this.state.zoomedBannerPosition
        this.lastTop = z.top
        this.lastLeft = z.left
      },
    })
  },
  componentDidMount() {
    Image.getSize(this.props.post.banner_url, (width, height) => {
      var ratio = height/width
      this.setState({ratio: ratio})
      this.zoomBanner(1)
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
  zoomBanner (scale, y, x) {
    var width = s.Width * (scale || 1)
    this.state.scale = scale
    this.state.zoomedBanner = {width: width, height: this.state.ratio * width}

    this.moveImageTo(y*2, -x*2)
    this.lastTop = this.state.zoomedBannerPosition.top
    this.lastLeft = this.state.zoomedBannerPosition.left
    this.forceUpdate()
  },
  moveImageTo (top, left) {
    var h = this.state.zoomedBanner.height
    top = h < s.Height ? 0 : Math.min((h - s.Height)/2, Math.abs(top)) * Math.sign(top)
    left = Math.max(Math.min(left, 0), s.Width - this.state.zoomedBanner.width)
    this.state.zoomedBannerPosition = {top: top, left: left}
    this.forceUpdate()
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
      var onBannerPress = () => p.display != 'full' ? global.goToPostAndScroll(p) : this.setState({zoomBanner: true})

      return <View style={[s.post.banner.container]}>
        <TouchableWithoutFeedback onPress={onBannerPress}>
          <Animated.Image style={[this.state.banner]} repeatMode="contain" source={{uri: p.banner_url}} />
        </TouchableWithoutFeedback>

        <Modal animationType={"slide"} transparent={true} visible={!!this.state.zoomBanner} onRequestClose={() => this.setState({zoomBanner: false})}>
          <TouchableOpacity style={[s.post.zoomedBanner.container]} onPress={() => this.setState({zoomBanner: false})}>
            <Image style={[this.state.zoomedBannerPosition, this.state.zoomedBanner]} repeatMode="cover" source={{uri: p.banner_url}} {...this.panResponder.panHandlers} />
          </TouchableOpacity>
        </Modal>
      </View>
    } else {
      null
    }
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

