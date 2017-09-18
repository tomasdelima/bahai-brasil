import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import Home from './components/home'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

global.store = createStore(reducer)
global.unsubscribe = store.subscribe(() => {})

render(
  <Provider store={store}>
    <Router>
      <div>
        <Link to="/">/</Link>
        <Route exact path="/" component={Home} />
        <Route path="/:id" component={Home} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('react-root')
)

Object.merge = (obj1, obj2) => {obj1 = obj1 || {}; obj2 = obj2 || {};var obj3 = JSON.parse(JSON.stringify(obj1)); Object.keys(obj2).map((key) => obj3[key] = obj2[key]); return obj3}
