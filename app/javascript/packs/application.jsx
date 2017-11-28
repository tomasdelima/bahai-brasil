import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import Styles from 'react-quick-styles'
import Page from './components/page'

global.store = createStore(reducer)
global.unsubscribe = store.subscribe(() => {})
global.s = Styles

render(
  <Provider store={store}>
    <Router>
      <div style={[s.flex, s.column, s.center2].merge()}>
        <Switch>
          <Route exact path="/" component={Page} />
          <Route path="/:slug"  component={Page} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('react-root')
)

