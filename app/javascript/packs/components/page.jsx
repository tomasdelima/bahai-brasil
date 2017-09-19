import React from 'react'

export default React.createClass({
  render () {
    var page = pages.filter((p) => p.slug == (this.props.match.params.slug))[0] || pages.filter((p) => p.slug == "")[0]

    return <div>
      <div>
        {page.body}
      </div>
    </div>
  }
})
