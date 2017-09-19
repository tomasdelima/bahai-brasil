import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

export default React.createClass({
  render () {
    return <div style={[s.flex, s.wide(), s.BG(s.t.darkWater(0.8)), s.breeSerif].merge()} id="top-bar">
      <img src={logoWhite} style={[s.square(35), s.padding(5)].merge()}/>
      {global.pages.map((page, i) => <Link key={i} to={page.slug} style={[s.noDecoration, s.white, s.padding(10)].merge()}>{page.title}</Link>)}
    </div>
  }
})
