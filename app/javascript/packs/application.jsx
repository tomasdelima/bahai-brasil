import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'

require('./import')
require('./theme')
require('./Lib/Styles')

global.store = createStore(reducer)
global.unsubscribe = store.subscribe(() => {})
global.m = s.isMobile() || $(document).width() < 1300

render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        {pages.map(page => page.sub_pages.map(subPage => <Route key={subPage.title} path={subPage.slug} component={Page}/>))}
        {pages.map(page => <Route key={page.title} path={page.slug} component={Page}/>)}
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('react-root')
)

