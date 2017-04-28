import React, { Component } from 'react'
import {
  Text,
  View,
  BackAndroid,
  Navigator,
  ScrollView,
  AsyncStorage,
} from 'react-native'

const Post = require('./post')
const NavBar = require('./navbar')
const DB = require('./db')
const MessageBar = require('./message-bar')
const s = require('./styles')
require('./custom')

module.exports = React.createClass({
  getInitialState () {
    return {posts: []}
  },
  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (global.scenes && global.scenes.getCurrentRoutes().length > 1) {
        global.scenes.pop()
        return true
      } else {
        return false
      }
    })

    DB.select('posts', {status: ['published']}, '').then((oldPosts) => {
      this.setPosts(oldPosts)
      this.loadPosts('  ')
    })
    this.updateScreen()
  },
  setPosts (posts) {
    this.setState({posts: posts.sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at)).filter((a) => a.status == 'published'), postsMessage: {type: 'success', body: 'Postagens atualizadas', timeout: 3000}})
  },
  setPost (post) {
    this.setState({post: post, postMessage: {type: 'success', body: 'Postagem atualizada', timeout: 3000}})
  },
  updateScreen () {
    setTimeout(() => {
      this.forceUpdate()
      this.updateScreen()
    }, 60000)
  },
  loadFromServer (resource, indent, id) {
    var url = {
      posts: 'https://bahai-brasil.herokuapp.com/api/v1/posts.json?updated_at=2000-01-01',
      post: 'https://bahai-brasil.herokuapp.com/api/v1/posts/' + id + '.json'
    }[resource]

    var t = new Date()
    this.setState({message: {}})
    if (DB.shouldLog) console.log(indent + 'FETCH: ' + url)
    return fetch(url).then((response) => JSON.parse(JSON.parse(response._bodyInit).data))
      .then((response) => {
        t = new Date() - t;
        ({posts: this.setPosts, post: this.setPost})[resource](response)
        return DB.update(resource, response, indent + '  ')
      })
      .then(() => { if (DB.shouldLog) console.log(indent + 'FETCH: ' + t/1000 + ' seconds') })
      .catch((e) => {
        console.log(indent + 'FETCH: ERROR: ' + e)
        var error = {}
        error[resource + 'Message'] = {type: 'error', body: 'Sem conexão'}
        this.setState(error)
      })
  },
  loadPosts (indent) {
    return this.loadFromServer('posts', indent)
  },
  loadPost (id, indent) {
    return this.loadFromServer('post', indent, id)
  },
  render () {
    return  <Navigator initialRoute={{id: 'posts', title: 'Postagens'}} renderScene={this.renderScene}/>
  },
  renderScene (route, navigator) {
    global.scenes = global.scenes || navigator

    if (route.id == 'posts') {
      var content = <View style={[s.posts.container]}>
        <MessageBar message={this.state.postsMessage}/>
        {this.state.posts.map((post, i) => <Post key={i} post={post} inline={true} />)}
        <Text style={[s.pagePadding]}/>
      </View>
      var onRefresh = () => this.loadPosts('  ')
    } else if (route.id == 'post') {
      if (route.post) this.state.post = route.post
      var content = <View>
        <MessageBar message={this.state.postMessage}/>
        <Post post={this.state.post} />
      </View>
      var onRefresh = () => this.loadPost(route.post.id, '  ')
    }

    return <NavBar title={route.title} onRefresh={onRefresh}>{content}</NavBar>
  }
})

