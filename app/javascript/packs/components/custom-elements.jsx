import React from 'react'
import TopBar from './top-bar'
import Banner from './banner'
import BackgroundImage from './background-image'
import Button from './button'
import Page from './page'

function renderer (fragment, props) {
  if (fragment.rule == 'page') {
    var args = ['']
    var c = fragment.content
    for (var i =0; i < c.length; i++) {
      args[args.length-1] += c[i] == ':' ? c[i-1] == '\\' ? ':' : '' : c[i]
      if (c[i] == ':') {
        if (c[i-1] != '\\') {
          args.push('')
        } else {
          args[args.length-1] = args[args.length-1].slice(0, -2) + args[args.length-1].slice(-1)
        }
      }
    }
    return <Page slug={args[0]} args={args} embedded key={props.i}/>
  } else if (fragment.rule == 'argument') {
    var args = this.props.args || [...Array(Number(fragment.content)+1||0)].map((v,i) => "Argument #"+i)
    return <span key={props.i} className="argument">{args[fragment.content]}</span>
  } else if (fragment.rule == 'banner') {
    return <Banner image={fragment.content[1]}>{props.renderString(fragment.content[2] || "")}</Banner>
  } else if (fragment.rule == 'bg-image') {
    return <BackgroundImage image={fragment.content[1]}>{props.renderString(fragment.content[2] || "")}</BackgroundImage>
  } else if (fragment.rule == 'flex') {
    debugger
    return null
    // return fragment.length == 1 ? this.render(fragment[0]) :
    // <div className="flex" style={[s.wide(), s.high(), s.flex, s[fragment.content[1]], s[fragment.content[2]], s[fragment.content[3]]].merge()}>
    //   {props.renderString(fragment.content[4] || "")}
    // </div>

    // <span key={i} className="array" style={[s.high()].merge()}>
    //   {fragment.map((item, i) => compileFragment(item, i))}
    // </span>
    // return <div className="flex" style={[s.wide(), s.high(), s.flex, s[fragment.content[1]], s[fragment.content[2]], s[fragment.content[3]]].merge()}>{props.renderString(fragment.content[4] || "")}</div>
  } else if (fragment.rule == 'wide') {
    var width = Number(fragment.content[1]) || fragment.content[1]
    return <div className="width" style={s.wide(width)}>{props.renderString(fragment.content[2] || "")}</div>
  } else if (fragment.rule == 'button') {
    return <Button bg={fragment.content[1]} border={fragment.content[2]}>{fragment.content[3]}</Button>
  }
}

var rules = [
  {name: 'page',     regexp: (/\[page:(.+?)\]/),      stopRulesPropagation: true},
  {name: 'argument', regexp: (/\[argument:(\d+?)\]/), stopRulesPropagation: true},
  {name: 'banner',   regexp: (/\[banner:(.+?)\]\s*/), stopRulesPropagation: true, multiMatch: true},
  {name: 'banner',   regexp: (/\<banner:(.+?):\s*([\s\S]+?)\s*:banner\>\s*/),     multiMatch: true},
  {name: 'bg-image', regexp: (/\<bg-image:(.+?):\s*([\s\S]+?)\s*:bg-image\>\s*/), multiMatch: true},
  {name: 'flex',     regexp: (/\<flex:(.+?):(.+?):(.+?):\s*([\s\S]+?)\s*:flex\>\s*/),   multiMatch: true},
  {name: 'wide',     regexp: (/\<wide:(.+?):\s*([\s\S]+?)\s*:wide\>\s*/),   multiMatch: true},
  {name: 'button',   regexp: (/\[button:(.+?):(.+?):(.+?)\]/),   multiMatch: true},
]

export default {rules, renderer}