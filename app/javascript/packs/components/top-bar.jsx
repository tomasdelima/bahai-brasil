import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

export default React.createClass({
  render () {
    return <div>
      {global.pages.map((page, i) => <Link key={i} to={page.slug}>{page.title}</Link>)}
    </div>
  }
})
