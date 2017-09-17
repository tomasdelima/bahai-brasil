import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'

global.store = createStore(todoApp)
global.unsubscribe = store.subscribe(() => {})

render(
  <Provider store={store}>
    <div>
    </div>
  </Provider>,
  document.getElementById('react-root')
)

Object.merge = (obj1, obj2) => {obj1 = obj1 || {}; obj2 = obj2 || {};var obj3 = JSON.parse(JSON.stringify(obj1)); Object.keys(obj2).map((key) => obj3[key] = obj2[key]); return obj3}
