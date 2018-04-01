import React from 'react'
import Optimized from '../Lib/Optimized'

export default class Banner extends Optimized {
  initialize () {
    this.bind = ["setHeight", "loop", "toggleMute", "onProgress", "nextQualityStep"]
    this.state = {muted: true, videoIndex: 0}
    this.waiting = 0
    this.dynamicQuality = false
  }

  componentDidMount () {
    this.setHeight()
  }

  setHeight () {
    this.setState({height: document.getElementById("topbar").clientHeight})
  }

  loop (event) {
    event.target.play()
  }

  onProgress (e) {
    if (!this.dynamicQuality) return

    try {
      var video = this.refs.video
      var i = this.state.videoIndex + this.nextQualityStep()
      i = Math.min(Math.max(i, 0), this.props.videos.length - 1)

      if (i != this.state.videoIndex) {
        this.setState({videoIndex: i})
        video.load()
      }
    } catch (e) {}
  }

  nextQualityStep () {
    var video = this.refs.video
    var distanceToBuffer = video.buffered.end(0) - video.currentTime
    var distanceToEnd = video.duration - video.currentTime
    var isFirstVideoIndex = this.state.videoIndex == 0
    var isLastVideoIndex = this.state.videoIndex == this.props.videos.length - 1

    if (this.waiting > 0) {
      console.log('Waiting to avail quality:', this.waiting)
      this.waiting -= 1
      return 0
    }

    // console.log(distanceToBuffer, video.buffered.end(0), video.currentTime)
    if (distanceToBuffer < 0.5 && distanceToEnd > 1 && !isFirstVideoIndex) {
      this.waiting = 30
      console.log('Decresing video quality')
      return -1
    }

    if (distanceToBuffer > 2 && distanceToEnd > 4 && !isLastVideoIndex) {
      this.waiting = 30
      console.log('Incresing video quality')
      return 1
    }

    return 0
  }

  toggleMute () {
    this.setState({muted: !this.state.muted})
  }

  render () {
    return <Flex wide high={window.innerHeight} relative style={{overflow: "hidden", borderBottom: "9px solid " + t.green}}>
      {this.props.videos && <video ref="video" width={$("body").prop("clientWidth")} muted={this.state.muted} onProgress={this.onProgress} autoPlay>
        <source src={this.props.videos[this.state.videoIndex]} type="video/mp4"/>
        Your browser does not support the video tag.
      </video>}

      {this.props.image && <img src={this.props.image} style={[s.wide()].merge()}/>}

      <Flex absolute wide={600} left="calc(50% - 300px)" top="50%" bold size={28} style={{color: t.white, fontFamily: 'Roboto'}}>{this.props.body}</Flex>
      <Flex absolute wide={30} high={30} className={"fa fa-volume-" + (this.state.muted ? "off" : "up")} size={30} right={30} bottom={30} bold style={{color: t.white}} onClick={this.toggleMute}/>
    </Flex>
  }
}
