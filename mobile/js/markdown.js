import React, { Component } from 'react'
import { Text } from 'react-native'

const s = require('./styles')

module.exports = React.createClass({
  maybeFragmentStringByRule (str, rules) {
    if (rules && rules.length > 0) {
      return this.fragmentStringByRule(str, rules)
    } else {
      return [str]
    }
  },

  fragmentStringByRule (str, rules) {
    var rule = rules[0]
    var splitted = str.split(rule.regexp) || []
    var matched =  str.match(rule.regexp) || []
    var shift = str.indexOf(splitted[0]) == 0
    var result = []
    splitted.map((p, j) => {
      if (splitted[j]) result[j*2+(shift ? 0 : 1)] = this.maybeFragmentStringByRule(splitted[j], rules.slice(1))
      if (matched[j])  result[j*2+(shift ? 1 : 0)] = {content: this.maybeFragmentStringByRule(matched[j].slice(1, -1), rules.slice(1)), ruleName: rule.name}
    })
    return result
  },

  fragmentString (str) {
    var rules = [
      {name: 'bold',   regexp: (/\*.+?\*/g)},
      {name: 'italic', regexp: (/\/.+?\//g)},
      {name: 'underline', regexp: (/\_.+?\_/g)},
    ]
    return this.fragmentStringByRule(str, rules)
  },


  compileFragment (fragment, i) {
    if (fragment) {
      var className = fragment.constructor.name

      if (className == 'String') {
        return <Text key={i}>{fragment}</Text>
      } else if (className == 'Array') {
        return <Text key={i}>
          {fragment.map((item, i) => this.compileFragment(item, i))}
        </Text>
      } else if (className == 'Object') {
        return <Text key={i} style={[s[fragment.ruleName]]}>
          {this.compileFragment(fragment.content)}
        </Text>
      } else {
        console.log('ERROR!!!: UNKNOWN FRAGMENT CLASS')
      }
    } else {
      return null
    }
  },
  render () {
    console.log('============================================')
    return <Text style={this.props.style}>
      {this.compileFragment(this.fragmentString(this.props.children))}
    </Text>
  }
})
