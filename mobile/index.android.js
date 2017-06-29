import React, { Component } from 'react'
import {
  AppRegistry,
} from 'react-native'

const Index = require('./js/index')
const BahaiBrasil = React.createClass({
  componentWillMount() {
    global.platform = 'android'
  },
  render() {
    return <Index/>
  }
})

AppRegistry.registerHeadlessTask('KeepAppAlive', () => {})
AppRegistry.registerComponent('BahaiBrasil', () => BahaiBrasil)
