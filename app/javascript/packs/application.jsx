import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'

require('./import')

global.store = createStore(reducer)
global.unsubscribe = store.subscribe(() => {})

render(
  <Provider store={store}>
    <Router>
      <div style={[s.flex, s.column, s.center2].merge()}>
        <Switch>
          {/*<Route exact path="/" component={Page} />*/}
          {/*<Route path="/:slug"  component={Page} />*/}
          <Route path="/"  component={Home} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('react-root')
)

