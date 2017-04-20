import React, { Component } from 'react'
import { Text, Image, Linking } from 'react-native'

const s = require('./styles')

module.exports = React.createClass({
  maybeFragmentStringByRule (str, rules) {
    if (rules && !rules[0].stopRulesPropagation && rules.length > 0) {
      return this.fragmentStringByRule(str, rules)
    } else {
      return str
    }
  },

  fragmentStringByRule (str, rules) {
    var sortedRules = rules.map((rule) => [(str.match(rule.regexp) || [''])[0].length, rule]).sort((a, b) => a[0]-b[0])
    var rule = sortedRules[sortedRules.length-1][1]
    var newRules = sortedRules.map((i) => i[1]).slice(0, -1)

    var splitted = str.split(rule.regexp) || []
    var matched =  str.match(rule.regexp) || []
    var shift = str.indexOf(splitted[0]) == 0
    var result = []
    splitted.map((p, j) => {
      if(matched[j])console.log(matched[j].slice(1, -1))
      if (splitted[j]) result[j*2+(shift ? 0 : 1)] = this.maybeFragmentStringByRule(splitted[j], newRules)
      if (matched[j])  result[j*2+(shift ? 1 : 0)] = {content: this.maybeFragmentStringByRule(matched[j].slice(1, -1), newRules), ruleName: rule.name}
    })
    return result.filter((a) => a)
  },

  fragmentString (str) {
    var rules = [
      {name: 'image',     regexp: (/\[image\:.+?\]/g), stopRulesPropagation: true},
      {name: 'url',       regexp: (/\[url\:.+?\]/g),   stopRulesPropagation: true},
      {name: 'bold',      regexp: (/\*.+?\*/g)},
      {name: 'italic',    regexp: (/\/.+?\//g)},
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
        return <Text key={i}>{fragment.map((item, i) => this.compileFragment(item, i))}</Text>
      } else if (fragment.ruleName == 'image') {
        return <Image key={i} resizeMode="contain" style={[s.wide(0.9), s.high(0.9)]} source={{uri: fragment.content.slice(6)}}/>
      } else if (fragment.ruleName == 'url') {
        var url = fragment.content.slice(4)
        return <Text key={i} style={[s.url]} onPress={() => Linking.openURL(url).catch()}>{url}</Text>
      } else if (className == 'Object') {
        return <Text key={i} style={[s[fragment.ruleName]]}>{this.compileFragment(fragment.content)}</Text>
      } else {
        console.log('ERROR!!!: UNKNOWN FRAGMENT')
      }
    } else {
      return null
    }
  },
  render () {
    return <Text style={this.props.style}>
      {this.compileFragment(this.fragmentString(this.props.children))}
    </Text>
  }
})
