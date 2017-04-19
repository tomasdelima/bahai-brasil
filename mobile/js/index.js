import React, { Component } from 'react'
import {
  Text,
  View,
  ScrollView,
  Navigator,
  AsyncStorage,
} from 'react-native'

const Post = require('./post')
const NavBar = require('./navbar')
const DB = require('./db')
const s = require('./styles')

module.exports = React.createClass({
  setPosts (posts) {
    this.setState({posts: posts.sort((a,b) => new Date(b.updated_at)-new Date(a.updated_at))})
  },
  componentDidMount () {
    DB.select('posts', {status: ['published']}, '').then((oldPosts) => {
      this.setPosts(oldPosts)
      this.loadPosts('  ')
    })
    this.updateScreen()
  },
  updateScreen () {
    setTimeout(() => {
      this.forceUpdate()
      this.updateScreen()
    }, 60000)
  },
  loadPosts (indent) {
    var t = performance.now()
    var url = 'https://bahai-brasil.herokuapp.com/api/v1/posts.json?updated_at=2000-01-01'
    if (DB.shouldLog) console.log(indent + 'FETCH: ' + url)
    return fetch(url).then((response) => JSON.parse(JSON.parse(response._bodyInit).data))
      .then((newPosts) => {
        t = performance.now() - t
        return DB.update('posts', newPosts, indent + '  ')
      })
      .then((updatedPosts) => this.setPosts(updatedPosts))
      .then(() => {
        if (DB.shouldLog) console.log(indent + 'FETCH: ' + t/1000 + ' seconds')
      })
  },
  loadPost (id, indent) {
    var t = performance.now()
    var url = 'https://bahai-brasil.herokuapp.com/api/v1/posts/' + id + '.json'
    if (DB.shouldLog) console.log(indent + 'FETCH: ' + url)
    return fetch(url).then((response) => JSON.parse(JSON.parse(response._bodyInit).data))
      .then((newPost) => {
        t = performance.now() - t
        this.setState({post: newPost})
        return DB.update('posts', [newPost], indent + '  ')
      })
      .then(() => {
        if (DB.shouldLog) console.log(indent + 'FETCH: ' + t/1000 + ' seconds')
      })
  },
  getInitialState () {
    return {posts: []}
  },
  render () {
    return  <Navigator initialRoute={{id: 'posts', title: 'Postagens'}} renderScene={this.renderScene}/>
  },
  renderScene (route, navigator) {
    global.scenes = global.scenes || navigator

    if (route.id == 'posts') {
      var content = <View>
        {this.state.posts.map((post, i) => <Post key={i} post={post} inline={true} />)}
        <Text style={[s.pagePadding]}/>
      </View>
      var onRefresh = () => this.loadPosts('  ')
    } else if (route.id == 'post') {
      var content = <Post post={this.state.post || route.post} />
      var onRefresh = () => this.loadPost(route.post.id, '  ')
    }

    return <NavBar title={route.title} onRefresh={onRefresh}>{content}</NavBar>
  }
})

