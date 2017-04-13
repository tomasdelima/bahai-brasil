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
  componentDidMount () {
    DB.select('posts', {status: ['published']}).then((oldPosts) => {
      this.setState({posts: oldPosts})
      this.loadPosts()
    })
  },
  loadPosts () {
    var url = 'https://bahai-brasil.herokuapp.com/api/v1/posts.json?updated_at=2000-01-01'
    console.log('FETCH     : ' + url)
    return fetch(url).then((response) => JSON.parse(JSON.parse(response._bodyInit).data))
      .then((newPosts) => DB.update('posts', newPosts))
      .then((updatedPosts) => this.setState({posts: updatedPosts}))
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
    } else if (route.id == 'post') {
      var content = <Post post={route.post} />
    }

    return <NavBar title={route.title} onRefresh={this.loadPosts}>{content}</NavBar>
  }
})

