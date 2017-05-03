import React, { Component } from 'react'
import { Text, Animated, Image, Linking } from 'react-native'

const s = require('./styles')

module.exports = React.createClass({
  componentWillMount() {
    this.rules = [
      {name: 'literal',   regexp: (/\[literal\:(.+)\]/), stopRulesPropagation: true},
      {name: 'image',     regexp: (/\[image\:(.+?)\]/),  stopRulesPropagation: true},
      {name: 'url',       regexp: (/\[url\:(.+?)\]/),    stopRulesPropagation: true},
      {name: 'bold',      regexp: (/\[bold:(.+)\]/)},
      {name: 'bold',      regexp: (/\*(.+?)\*/)},
      {name: 'italic',    regexp: (/\/(.+?)\//)},
      {name: 'underline', regexp: (/\_(.+?)\_/)},
    ]
  },
  fragmentString (str) {
    var rule = this.firstMatchedRule(str)
    if (rule) {
      var index = str.search(rule.regexp)
      var length = str.match(rule.regexp)[0].length
      var before = str.slice(0, index)
      var matched = str.match(rule.regexp)[1]
      var fragmentedMatched = rule.stopRulesPropagation ? matched : this.fragmentString(matched)
      var after = str.slice(index + length)
      var result = [this.fragmentString(before), {content: fragmentedMatched, rule: rule.name}, this.fragmentString(after)]

      return result.compact().flatten()
    } else {
      return str
    }
  },
  firstMatchedRule (str) {
    var sortedRules = this.rules.map((rule) => [str.search(rule.regexp), rule]).sort((a, b) => a[0]-b[0])
    var filteredRules = sortedRules.filter((rule) => rule[0] >= 0).map((rule) => rule[1])
    return filteredRules[0]
  },
  compileFragment (fragment, i) {
    if (fragment) {
      var className = fragment.constructor.name

      if (className == 'String') {
        return <Text key={i}>{fragment}</Text>
      } else if (className == 'Array') {
        return <Text key={i}>{fragment.map((item, i) => this.compileFragment(item, i))}</Text>
      } else if (fragment.rule == 'literal') {
        return <Text key={i}>{fragment.content}</Text>
      } else if (fragment.rule == 'image') {
        return <Image key={i} resizeMode="contain" style={[s.wide(1), s.high(1)]} source={{uri: fragment.content}}/>
      } else if (fragment.rule == 'url') {
        var url = fragment.content
        return <Text key={i} style={[s.url]} onPress={() => Linking.openURL(url).catch()}>{url}</Text>
      } else if (className == 'Object') {
        return <Text key={i} style={[s[fragment.rule]]}>{this.compileFragment(fragment.content)}</Text>
      } else {
        console.log('ERROR!!!: UNKNOWN FRAGMENT')
      }
    } else {
      return null
    }
  },
  render () {
    return <Animated.Text style={this.props.style}>
      {this.compileFragment(this.fragmentString(this.props.children))}
    </Animated.Text>
  }
})
