import React, { Component } from 'react'
import {
  Text,
  View,
  BackAndroid,
} from 'react-native'

const Post = require('./post')
const NavBar = require('./navbar')
const DB = require('./db')
const MessageBar = require('./message-bar')
const s = require('./styles')
require('./custom')

module.exports = React.createClass({
  getInitialState () {
    return {posts: [], resource: 'posts'}
  },
  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.state.resource = 'post') {
        this.goToPosts()
        return true
      } else {
        return false
      }
    })

    DB.select('posts', {status: ['published']}, '').then((oldPosts) => {
      this.setPosts(oldPosts)
      this.loadFromRemoteServer('posts', '  ')
    })
    this.updateScreen()
  },
  updateScreen () {
    setTimeout(() => {
      this.forceUpdate()
      this.updateScreen()
    }, 60000)
  },
  loadFromRemoteServer (resource, indent, id) {
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
        ({posts: this.setPosts, post: this.setPost})[resource](response, true)
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
  setPost (post, showMessage) {
    var message = showMessage ? {type: 'success', body: 'Postagem atualizada', timeout: 3000} : null
    this.setState({post: post, message: message})
  },
  setPosts (posts, showMessage) {
    var message = showMessage ? {type: 'success', body: 'Postagens atualizadas', timeout: 3000} : null
    this.setState({posts: posts.sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at)).filter((a) => a.status == 'published'), message: message})
    if (this.state.resource == 'post') this.goToPost(this.state.post)
  },
  goToPosts () {
    this.state.posts.map((p) => p.display = 'inline')
    this.setState({resource: 'posts'})
  },
  goToPost (post) {
    this.setPost(post)
    this.state.posts.map((p) => p.display = p.id == post.id ? 'full' : 'hidden')
    this.setState({resource: 'post'})
  },
  render () {
    var goToPosts = this.state.resource == 'post' ? this.goToPosts : null
    var loadPosts = () => this.loadFromRemoteServer(this.state.resource, '  ', (this.state.post || {}).id)
    var title = this.state.resource == 'posts' ? 'Postagens' : this.state.post.title

    return <NavBar title={title} onRefresh={loadPosts} onReturn={goToPosts}>
      <View style={[s.posts.container]}>
        <MessageBar message={this.state.message}/>
        {this.state.posts.map((post, i) => <Post key={i} post={post} onPress={() => this.goToPost(post)} />)}
        <Text style={[s.pagePadding]}/>
      </View>
    </NavBar>
  },
})

