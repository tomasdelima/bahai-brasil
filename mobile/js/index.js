import React, { Component } from 'react'
import {
  Text,
  View,
  BackAndroid,
  Share,
  Linking,
  Platform,
} from 'react-native'
import VersionNumber from 'react-native-version-number'

const Markdown = require('./markdown')
const Push = require('./push')
const Category = require('./category')
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
    global.goToPostAndScroll = this.goToPostAndScroll
    global.domain = 'https://bahai-brasil.herokuapp.com/'
    // global.domain = 'https://bahaibrasil.localtunnel.me/'
    global.sharePost = this.sharePost
    global.db = DB

    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.state.resource == 'post') {
        this.goToPostsAndScroll()
        return true
      } else {
        return false
      }
    })

    DB.select('posts', undefined, '').then((oldPosts) => {
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
  checkCurrentAppVersion (indent) {
    var url = global.domain + 'api/v1/app_version'
    var t = new Date()

    DB.log(indent + 'FETCH: ' + url)
    fetch(url).then((response) => {
      DB.log(indent + 'FETCH: ' + (new Date() - t)/1000 + ' seconds')
      var latestVersion = response._bodyInit
      var currentVersion = VersionNumber.buildVersion

      if (latestVersion != currentVersion) {
        var storeUrl = {
          // ios: '',
          android: 'https://play.google.com/store/apps/details?id=com.bahai.brasil',
        }[Platform.OS]

        this.setState({message: {
          type: 'warning',
          body: <Text>Nova versão disponível, <Text style={[s.lightUrl]}>clique aqui para atualizar</Text></Text>,
          onPress: () => Linking.openURL(storeUrl).catch(),
        }})
      }
    }).catch((e) => DB.log(indent + 'FETCH: ERROR: ' + e))
  },
  loadFromRemoteServer (resource, indent, id) {
    var url = {
      posts: global.domain + 'api/v1/posts.json?updated_at=2000-01-01',
      post: global.domain + 'api/v1/posts/' + id + '.json'
    }[resource]

    var t = new Date()
    this.setState({message2: {}})
    DB.log(indent + 'FETCH: ' + url)
    return fetch(url).then((response) => JSON.parse(JSON.parse(response._bodyInit).data))
      .then((response) => {
        // var response = {"data":[{"id":509,"title":"Test Post 100","status":"published","created_by_id":2,"author_id":1,"created_at":"2017-04-12T22:26:13.924Z","updated_at":"2017-05-04T14:35:13.159Z","banner_url":"https://thumb1.shutterstock.com/display_pic_with_logo/534712/376636723/stock-vector-group-of-business-people-big-crowd-business-people-mix-ethnic-flat-vector-illustration-376636723.jpg","category_id":1,"category":{"id":1,"name":"Category 1","created_at":"2017-05-04T14:35:02.189Z","updated_at":"2017-05-04T14:35:02.189Z"},"author":{"id":1,"created_at":"2017-04-11T12:14:20.341Z","updated_at":"2017-05-04T14:17:59.098Z","email":"tomasdelima@gmail.com","name":"Tomás de Lima"},"paragraphs":[{"id":1996,"body":"Paragraph 10: Etiam posuere quam ac quam. Maecenas aliquet accumsan leo. Nullam dapibus fermentum ipsum. Etiam quis quam. Integer lacinia. Nulla est. Nulla turpis magna, cursus sit amet, suscipit a, interdum id, felis. Integer vulputate sem a nibh rutrum consequat. Maecenas lorem. Pellentesque pretium","style":"justify","post_id":509,"created_at":"2017-04-12T22:26:13.926Z","updated_at":"2017-04-12T22:26:13.926Z"},{"id":1997,"body":"Paragraph 9: Etiam posuere quam ac quam. Maecenas aliquet accumsan leo. Nullam dapibus fermentum ipsum. Etiam quis quam. Integer lacinia. Nulla est. Nulla turpis magna, cursus sit amet, suscipit a, interdum id, felis. Integer vulputate sem a nibh rutrum consequat. Maecenas lorem. Pellentesque pretium","style":"right","post_id":509,"created_at":"2017-04-12T22:26:13.927Z","updated_at":"2017-04-12T22:26:13.927Z"},{"id":1998,"body":"Paragraph 8: Etiam posuere quam ac quam. Maecenas aliquet accumsan leo. Nullam dapibus fermentum ipsum. Etiam quis quam. Integer lacinia. Nulla est. Nulla turpis magna, cursus sit amet, suscipit a, interdum id, felis. Integer vulputate sem a nibh rutrum consequat. Maecenas lorem. Pellentesque pretium","style":"indent3","post_id":509,"created_at":"2017-04-12T22:26:13.927Z","updated_at":"2017-04-12T22:26:13.927Z"},{"id":1999,"body":"Paragraph 7: Etiam posuere quam ac quam. Maecenas aliquet accumsan leo. Nullam dapibus fermentum ipsum. Etiam quis quam. Integer lacinia. Nulla est. Nulla turpis magna, cursus sit amet, suscipit a, interdum id, felis. Integer vulputate sem a nibh rutrum consequat. Maecenas lorem. Pellentesque pretium","style":"center","post_id":509,"created_at":"2017-04-12T22:26:13.928Z","updated_at":"2017-04-12T22:26:13.928Z"},{"id":2000,"body":"Paragraph 6: Etiam posuere quam ac quam. Maecenas aliquet accumsan leo. Nullam dapibus fermentum ipsum. Etiam quis quam. Integer lacinia. Nulla est. Nulla turpis magna, cursus sit amet, suscipit a, interdum id, felis. Integer vulputate sem a nibh rutrum consequat. Maecenas lorem. Pellentesque pretium","style":"indent1","post_id":509,"created_at":"2017-04-12T22:26:13.929Z","updated_at":"2017-04-12T22:26:13.929Z"},{"id":2001,"body":"Paragraph 5: Etiam posuere quam ac quam. Maecenas aliquet accumsan leo. Nullam dapibus fermentum ipsum. Etiam quis quam. Integer lacinia. Nulla est. Nulla turpis magna, cursus sit amet, suscipit a, interdum id, felis. Integer vulputate sem a nibh rutrum consequat. Maecenas lorem. Pellentesque pretium","style":"indent3","post_id":509,"created_at":"2017-04-12T22:26:13.930Z","updated_at":"2017-04-12T22:26:13.930Z"},{"id":2002,"body":"Paragraph 4: Etiam posuere quam ac quam. Maecenas aliquet accumsan leo. Nullam dapibus fermentum ipsum. Etiam quis quam. Integer lacinia. Nulla est. Nulla turpis magna, cursus sit amet, suscipit a, interdum id, felis. Integer vulputate sem a nibh rutrum consequat. Maecenas lorem. Pellentesque pretium","style":"right","post_id":509,"created_at":"2017-04-12T22:26:13.931Z","updated_at":"2017-04-12T22:26:13.931Z"},{"id":2003,"body":"Paragraph 3: Etiam posuere quam ac quam. Maecenas aliquet accumsan leo. Nullam dapibus fermentum ipsum. Etiam quis quam. Integer lacinia. Nulla est. Nulla turpis magna, cursus sit amet, suscipit a, interdum id, felis. Integer vulputate sem a nibh rutrum consequat. Maecenas lorem. Pellentesque pretium","style":"indent2","post_id":509,"created_at":"2017-04-12T22:26:13.932Z","updated_at":"2017-04-12T22:26:13.932Z"},{"id":2004,"body":"Paragraph 2: Etiam posuere quam ac quam. Maecenas aliquet accumsan leo. Nullam dapibus fermentum ipsum. Etiam quis quam. Integer lacinia. Nulla est. Nulla turpis magna, cursus sit amet, suscipit a, interdum id, felis. Integer vulputate sem a nibh rutrum consequat. Maecenas lorem. Pellentesque pretium","style":"right","post_id":509,"created_at":"2017-04-12T22:26:13.933Z","updated_at":"2017-04-12T22:26:13.933Z"},{"id":2005,"body":"Paragraph 1: Etiam posuere quam ac quam. Maecenas aliquet accumsan leo. Nullam dapibus fermentum ipsum. Etiam quis quam. Integer lacinia. Nulla est. Nulla turpis magna, cursus sit amet, suscipit a, interdum id, felis. Integer vulputate sem a nibh rutrum consequat. Maecenas lorem. Pellentesque pretium","style":"indent2","post_id":509,"created_at":"2017-04-12T22:26:13.934Z","updated_at":"2017-04-12T22:26:13.934Z"}]}],"time":"2017-05-04T14:56:46.260Z"}.data
        t = new Date() - t;
        ({posts: this.setPosts, post: this.setPost})[resource](response, true)
        return DB.update(resource, response, indent + '  ')
      })
      .then(() => { DB.log(indent + 'FETCH: ' + t/1000 + ' seconds') })
      .then(() => this.checkCurrentAppVersion(indent))
      .catch((e) => {
        DB.log(indent + 'FETCH: ERROR: ' + e)
        this.setState({message2: {type: 'error', body: 'Sem conexão'}})
      })
  },
  getFullPost () {
    return Object.map(this.state.posts, (c, posts) => posts.filter((p) => p.display == 'full')[0]).compact()[0]
  },
  setPosts (posts, showMessage) {
    var message = showMessage ? {type: 'success', body: 'Postagens atualizadas', timeout: 3000} : null

    var filteredPosts = posts.sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at)).filter((a) => a.status == 'published')
    var categories = filteredPosts.map((p) => p.category.name).unique()
    var groupedPosts = categories.reduce((m, c) => {m[c] = posts.filter((p) => p.category.name == c); return m}, {})

    this.setState({posts: groupedPosts, message2: message})
    if (this.state.resource == 'post') this.goToPost(this.state.post)
  },
  setPost (post, showMessage) {
    var message = showMessage ? {type: 'success', body: 'Postagem atualizada', timeout: 3000} : null
    this.setState({post: post, message2: message})
  },
  goToPosts () {
    Object.map(this.state.posts, (c, posts) => posts.map((p) => p.display = 'inline'))
    this.setState({resource: 'posts'})
  },
  goToPost (post) {
    this.setPost(post)

    Object.map(this.state.posts, (c, posts, i) => {
      posts.map((p, j) => {
        this.state.posts[c][j].display = p.id == post.id ? 'full' : 'hidden'
      })
    })

    this.setState({resource: 'post'})
  },
  scrollToOldScrollPosition (i) {
    if (!global.userTouched) {
      global.scrollview.scrollTo({y: this.oldScrollPosition})
      setTimeout(() => this.scrollToOldScrollPosition(i*2), 100*i)
    }
  },
  goToPostsAndScroll () {
    global.userTouched = false
    this.scrollToOldScrollPosition(1)
    this.goToPosts()
  },
  goToPostAndScroll (post) {
    global.userTouched = false
    this.oldScrollPosition = (global.scrollOffset || 0) + 0
    global.scrollview.scrollTo({y: 0})
    this.goToPost(post)
  },
  sharePost () {
    Share.share({message: Markdown.getText(this.getFullPost().title + "\n\n" + this.getFullPost().paragraphs.reduce((m, p) => m = m + p.body , ''))})
  },
  render () {
    var goToPosts = this.state.resource == 'post' ? this.goToPostsAndScroll : null
    var loadPosts = () => this.loadFromRemoteServer(this.state.resource, '  ', (this.state.post || {}).id)
    var title = this.state.resource == 'posts' ? "Bahá'í Brasil" : this.state.post.category.name

    return <NavBar title={title} onRefresh={loadPosts} onReturn={goToPosts}>
      {global.platform == 'android' ? <Push/> : null}
      <View style={[s.posts.container]}>
        <MessageBar message={this.state.message}/>
        <MessageBar message={this.state.message2}/>

        {Object.map(this.state.posts, (category, posts, i) =>
          <Category key={i} category={posts[0].category} posts={posts}/>
        )}
        <Text style={[s.pagePadding]}/>
      </View>
    </NavBar>
  },
})
