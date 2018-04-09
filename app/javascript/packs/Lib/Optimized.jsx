import React, { Component } from 'react'

export default class Optimized extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.props = props
    this.initialize()
    this.bind.map(fn => {
      try {
        this[fn] = this[fn].bind(this)
      } catch (e) {
        console.error("Error binding function: " + fn)
      }
    })
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
