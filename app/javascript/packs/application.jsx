import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Styles from 'react-quick-styles'
import Page from './components/page'
import TopBar from './components/top-bar'

global.store = createStore(reducer)
global.unsubscribe = store.subscribe(() => {})
global.s = Styles

render(
  <Provider store={store}>
    <Router>
      <div style={[s.flex, s.column, s.center2].merge()}>
        <TopBar/>
        <Route exact path="/" component={Page} />
        <Route path="/:slug"  component={Page} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('react-root')
)

