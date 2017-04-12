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
const s = require('./styles')

module.exports = React.createClass({
  componentDidMount() {
    AsyncStorage.getItem('posts').then((posts) => {
      // this.setState({posts: posts})
      AsyncStorage.getItem('updated_at').then((updated_at) => {
        var url = 'https://bahai-brasil.herokuapp.com/api/v1/posts.json?updated_at=' + ('2000-01-01')
        console.log('FETCH:      ' + url)
        fetch(url).then((response) => {
          var parsedResponse = JSON.parse(response._bodyInit)
          var newPosts = JSON.parse(parsedResponse.data)
          var allPosts = this.state.posts.concat(newPosts)

          console.log('FETCHED:    ' + newPosts.length + ' posts')
          this.setState({posts: allPosts})
          AsyncStorage.setItem('posts', parsedResponse.data).then(() => {
            AsyncStorage.setItem('updated_at', parsedResponse.time)
          })
        })
      })
    })
  },
  getInitialState() {
    return {posts: []}
  },
  render() {
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

    return <NavBar title={route.title}>{content}</NavBar>
  }
})

