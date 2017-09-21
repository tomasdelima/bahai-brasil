import React, { Component } from 'react'

export default class Markdown extends React.Component {
  static rules = [
    {name: 'literal',   regexp: (/\[literal\:(.+)\]/),                stopRulesPropagation: true},
    {name: 'alignment', regexp: (/\[(left|center|right|justify):(.+?)\]\n/), multiMatch: true},
    {name: 'image',     regexp: (/\[image\:((left|right):)?(.+?)\]/), stopRulesPropagation: true, multiMatch: true},
    {name: 'url',       regexp: (/\[url\:((.+?):)?(http.+?)\]/),      stopRulesPropagation: true, multiMatch: true},
    {name: 'new-line',  regexp: (/\n/),                               stopRulesPropagation: true},
    {name: 'heading',   regexp: (/(\#+) *(.+)/), multiMatch: true},
    {name: 'float',     regexp: (/\[float\:(.+?):(.+?)\[/), multiMatch: true},
    {name: 'bold',      regexp: (/\[bold:(.+)\]/)},
    {name: 'bold',      regexp: (/\*(.+?)\*/)},
    {name: 'quote',     regexp: (/\[quote:(.+)\]/)},
    {name: 'quote',     regexp: (/\`(.+?)\`/)},
    {name: 'italic',    regexp: (/\/(.+?)\//)},
    {name: 'underline', regexp: (/\_(.+?)\_/)},
  ]

  constructor(props) {
    super(props)
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
      var result = [this.fragmentString(before), {content: rule.multiMatch ? matched : fragmentedMatched, rule: rule.name}, this.fragmentString(after)]

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
        return fragment
      } else if (className == 'Array') {
        return <span key={i}>{fragment.map((item, i) => this.compileFragment(item, i))}</span>
      } else if (fragment.rule == 'literal') {
        return <span key={i}>{fragment.content[1]}</span>
      } else if (fragment.rule == 'image') {
        return <img key={i} style={{float: fragment.content[2], padding: fragment.content[2] ? 10 : 0}} src={fragment.content[3]}/>
      } else if (fragment.rule == 'alignment') {
        return <div key={i} style={{textAlign: fragment.content[1]}}>{this.renderString(fragment.content[2])}</div>
      } else if (fragment.rule == 'heading') {
        return React.createElement("h" + fragment.content[1].length, {key: i}, fragment.content[2])
      } else if (fragment.rule == 'url') {
        var url = fragment.content
        return <a key={i} style={[s.url]} href={url[3]}>{url[2] || url[3]}</a>
      } else if (fragment.rule == 'new-line') {
        return <br key={i}/>
      } else if (className == 'Object') {
        return <span key={i} style={s[fragment.rule]} className={fragment.rule}>{this.compileFragment(fragment.content)}</span>
      } else {
        console.error('ERROR!!!: UNKNOWN FRAGMENT')
      }
    } else {
      return null
    }
  }

  renderString (str) {
    return this.compileFragment(this.fragmentString(str))
  }

  render () {
    return this.renderString(this.props.children)
  }
}
