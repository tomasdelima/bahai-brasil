import React, { Component } from 'react'

export default class Markdown extends React.Component {
  static rules = [
    {name: 'literal',   regexp: (/\[literal:(.+):literal\]/),                stopRulesPropagation: true},

    {name: 'columns', regexp: (/\[columns:([\s\S]+?):columns\]/)},
    {name: 'width',   regexp: (/\[([1-9]|1[0-2])?:(.+?):([1-9]|1[0-2])\]\n?/), i: 2, multiMatch: true},

    {name: 'left',    type: 'alignment', regexp: (/\[l(eft)?:(.+?):l(eft)?\]\n?/),       i: 2, multiMatch: true},
    {name: 'center',  type: 'alignment', regexp: (/\[c(enter)?:(.+?):c(enter)?\]\n?/),   i: 2, multiMatch: true},
    {name: 'right',   type: 'alignment', regexp: (/\[r(ight)?:(.+?):r(ight)?\]\n?/),     i: 2, multiMatch: true},
    {name: 'justify', type: 'alignment', regexp: (/\[j(ustify)?:(.+?):j(ustify)?\]\n?/), i: 2, multiMatch: true},

    {name: 'image',     regexp: (/\[image:((left|right):)?(.+?)\]/), stopRulesPropagation: true, multiMatch: true},
    {name: 'url',       regexp: (/\[url:((.+?):)?(http.+?)\]/),      stopRulesPropagation: true, multiMatch: true},
    {name: 'new-line',  regexp: (/\n/),                              stopRulesPropagation: true},
    {name: 'heading',   regexp: (/(?:^|\n)(\#+) *(.+)/), multiMatch: true},

    {name: 'bold',      regexp: (/\[bold:(.+):bold\]/)},
    {name: 'bold',      regexp: (/\*(.+?)\*/)},
    {name: 'italic',    regexp: (/\/(.+?)\//)},
    {name: 'underline', regexp: (/\_(.+?)\_/)},
    {name: 'quote',     regexp: (/\[quote:(.+):quote\]/)},
    {name: 'quote',     regexp: (/\`(.+?)\`/)},

    {name: 'color',     regexp: (/\[(#.{6}|#.{3}):(.+):#(.{6}|.{3})\]/), multiMatch: true},
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
      var fragmentedMatched = rule.stopRulesPropagation ? matched[1] : this.fragmentString(matched[rule.i || 1])
      var result = [this.fragmentString(before), {content: rule.multiMatch ? matched : fragmentedMatched, rule: rule.name, type: rule.type}]

      var after = str.slice(index + length)
      var fragmentedAfter = this.fragmentString(after)
      result = fragmentedAfter.constructor.name == "Array" ? [...result, ...fragmentedAfter] : [...result, fragmentedAfter]

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
        return <span key={i} className="array" style={[].merge()}>{fragment.map((item, i) => this.compileFragment(item, i))}</span>
      } else if (fragment.rule == 'literal') {
        return <span key={i} className="literal">{fragment.content}</span>
      } else if (fragment.rule == 'columns') {
        return <div key={i} className="columns" style={[s.flex, s.wrap].merge()}>{fragment.content.map((item, i) => this.compileFragment(item, i))}</div>
      } else if (fragment.rule == 'width') {
        return <div key={i} className="width" style={[s.wide(100*fragment.content[1]/12 + "%"), s.minWidth(), s.shrink(0)].merge()}>{this.renderString(fragment.content[2])}</div>
      } else if (fragment.rule == 'image') {
        return <img key={i} className="image" style={{float: fragment.content[2], padding: fragment.content[2] ? 10 : 0}} src={fragment.content[3]}/>
      } else if (fragment.type == 'alignment') {
        return <div key={i} className="alignment" style={{textAlign: fragment.rule}}>{this.renderString(fragment.content[2])}</div>
      } else if (fragment.rule == 'heading') {
        return React.createElement("h" + fragment.content[1].length, {key: i, className: 'heading'}, fragment.content[2])
      } else if (fragment.rule == 'url') {
        var url = fragment.content
        return <a key={i} className="url" style={[s.url]} href={url[3]}>{url[2] || url[3]}</a>
      } else if (fragment.rule == 'color') {
        return <div key={i} className="color" style={{color: fragment.content[1]}}>{this.renderString(fragment.content[2])}</div>
      } else if (fragment.rule == 'new-line') {
        return <br key={i}/>
      } else if (className == 'Object') {
        return <span key={i} className={fragment.rule} style={s[fragment.rule]}>{this.compileFragment(fragment.content)}</span>
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
