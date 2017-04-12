import React, { Component } from 'react'
import {
  AppRegistry,
} from 'react-native'

const Index = require('./js/index')
const BahaiBrasil = React.createClass({
  render() {
    return <Index/>
  }
})

AppRegistry.registerComponent('BahaiBrasil', () => BahaiBrasil)
