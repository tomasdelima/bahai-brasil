import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'

require('./import')
require('./theme')

global.store = createStore(reducer)
global.unsubscribe = store.subscribe(() => {})

render(
  <Provider store={store}>
    <Router>
      <Flex start1 column>
        <TopBar/>

        <Switch>
          <Route path="/"  component={Home} />
        </Switch>
      </Flex>
    </Router>
  </Provider>,
  document.getElementById('react-root')
)

