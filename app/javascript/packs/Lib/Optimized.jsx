import React, { Component } from 'react'

export default class Optimized extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.props = props
    this.initialize()
    this.bind.map(fn => this[fn] = this[fn].bind(this))
  }

  bind = []

  initialize () {}

  shouldComponentUpdate (nextProps, nextState) {
    try {
      var propsChanged = JSON.stringify(this.props) != JSON.stringify(nextProps)
      var stateChanged = JSON.stringify(this.state) != JSON.stringify(nextState)
      return propsChanged || stateChanged
    } catch (e) {
      return true
    }
  }
}
