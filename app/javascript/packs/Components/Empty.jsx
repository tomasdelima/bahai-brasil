import React from 'react'
import Optimized from '../Lib/Optimized'

export default class Empty extends Optimized {
  initialize () {this.bind = []}
  componentWillMount() {}
  componentDidMount() {}
  componentWillReceiveProps (nextProps) {}
  shouldComponentUpdate (nextProps, nextState) {return true}
  componentWillUpdate (nextProps, nextState) {}
  componentDidUpdate (prevProps, prevState) {}
  componentWillUnmount () {}
  componentDidCatch (prevProps, prevState) {}

  render () {
    return null
  }
}
