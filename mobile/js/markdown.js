import React, { Component } from 'react'
import { Text, Animated, Image, Linking } from 'react-native'

const s = require('./styles')

class Markdown extends React.Component {
  static rules = [
    {name: 'literal',   regexp: (/\[literal\:(.+)\]/),           stopRulesPropagation: true},
    {name: 'image',     regexp: (/\[image\:(.+?)\]/),            stopRulesPropagation: true},
    {name: 'url',       regexp: (/\[url\:((.+?):)?(http.+?)\]/), stopRulesPropagation: true},
    {name: 'bold',      regexp: (/\[bold:(.+)\]/)},
    {name: 'bold',      regexp: (/\*(.+?)\*/)},
    {name: 'italic',    regexp: (/\/(.+?)\//)},
    {name: 'underline', regexp: (/\_(.+?)\_/)},
  ]

  static getText (str) {
    var markdown = new Markdown()
    return markdown.compileTextFragment(markdown.fragmentString(str))
  }

  static getImages (str) {
    var rule = Markdown.rules.filter((rule) => rule.name == 'image')[0]
    var images = []
    var matched = str.match(rule.regexp)

    while(matched) {
      images.push(matched[1])
      str = str.slice(matched.index + matched[0].length)
      matched = str.match(rule.regexp)
    }

    return images
  }

  fragmentString (str) {
    var rule = this.firstMatchedRule(str)
    if (rule) {
      var index = str.search(rule.regexp)
      var length = str.match(rule.regexp)[0].length
      var before = str.slice(0, index)
      var matched = str.match(rule.regexp)
      var fragmentedMatched = rule.stopRulesPropagation ? matched[1] : this.fragmentString(matched[1])
      var after = str.slice(index + length)
      var result = [this.fragmentString(before), {content: rule.name == 'url' ? matched : fragmentedMatched, rule: rule.name}, this.fragmentString(after)]

      return result.compact().flatten()
    } else {
      return str
    }
  }

  firstMatchedRule (str) {
    var sortedRules = Markdown.rules.map((rule) => [str.search(rule.regexp), rule]).sort((a, b) => a[0]-b[0])
    var filteredRules = sortedRules.filter((rule) => rule[0] >= 0).map((rule) => rule[1])
    return filteredRules[0]
  }

  compileFragment (fragment, i) {
    if (fragment) {
      var className = fragment.constructor.name

      if (className == 'String') {
        return <Text key={i}>{fragment}</Text>
      } else if (className == 'Array') {
        return <Text key={i}>{fragment.map((item, i) => this.compileFragment(item, i))}</Text>
      } else if (fragment.rule == 'literal') {
        return <Text key={i}>{fragment.content[1]}</Text>
      } else if (fragment.rule == 'image') {
        this.imageCounter += 1
        var localImageCounter = this.imageCounter + 0
        return <Text key={i} onPress={() => this.props.onImagePress(localImageCounter)}>
          <Image resizeMode="contain" style={[s.wide(1), s.high(1)]} source={{uri: fragment.content}}/>
        </Text>
      } else if (fragment.rule == 'url') {
        var url = fragment.content
        return <Text key={i} style={[s.url]} onPress={() => Linking.openURL(url[3]).catch()}>{url[2] || url[3]}</Text>
      } else if (className == 'Object') {
        return <Text key={i} style={[s[fragment.rule]]}>{this.compileFragment(fragment.content)}</Text>
      } else {
        global.db.log('ERROR!!!: UNKNOWN FRAGMENT')
      }
    } else {
      return null
    }
  }

  compileTextFragment (fragment, i) {
    if (fragment) {
      var className = fragment.constructor.name

      if (className == 'String') {
        return fragment
      } else if (className == 'Array') {
        return fragment.map((item, i) => this.compileTextFragment(item, i)).join('')
      } else if (fragment.rule == 'literal' || fragment.rule == 'image') {
        return fragment.content
      } else if (fragment.rule == 'url') {
        return fragment.content[3]
      } else if (className == 'Object') {
        return this.compileTextFragment(fragment.content)
      } else {
        global.db.log('ERROR!!!: UNKNOWN FRAGMENT')
      }
    } else {
      return null
    }
  }

  render () {
    this.imageCounter = 0
    return <Animated.Text style={this.props.style}>
      {this.compileFragment(this.fragmentString(this.props.children))}
    </Animated.Text>
  }
}

module.exports = Markdown
