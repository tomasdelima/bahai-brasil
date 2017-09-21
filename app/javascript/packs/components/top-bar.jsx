import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

export default React.createClass({
  render () {
    var textStyles = [s.noDecoration, s.white, s.padding(10)].merge()

    return <div style={[s.flex, s.spacedIn, s.wide(), s.darkWaterBG, s.breeSerif].merge()} id="top-bar">
      <div style={[s.flex].merge()}>
        <img src={logoWhite} style={[s.square(35), s.padding(5)].merge()}/>
        {global.pages.map((page, i) => <Link key={i} to={page.slug} style={textStyles}>{page.title}</Link>)}
      </div>

      <div style={[s.flex].merge()}>
        <span style={textStyles}>{(user || {}).email}</span>
      </div>
    </div>
  }
})
