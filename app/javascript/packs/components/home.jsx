import React from 'react'

export default React.createClass({
  render () {
    return <div>
      Home {this.props.match.params.id}
    </div>
  }
})
