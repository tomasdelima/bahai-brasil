import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class BahaiBrasil extends React.Component {
  render () {
    return <div>Hello {this.props.name}!</div>
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<BahaiBrasil />, document.getElementById('react-root'))
})
