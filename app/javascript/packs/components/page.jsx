import React from 'react'
import MarkdownRenderer from 'react-markdown'

export default React.createClass({
  getInitialState() {
    return {
      ...pages.filter((p) => p.slug == (this.props.match.params.slug))[0] || pages.filter((p) => p.slug == "")[0]
    }
  },
  updateBody (e) {
    this.setState({body: e.nativeEvent.target.value})
  },
  renderBody () {
    if (window.location.hash == "#editor") {
      return <textarea onChange={this.updateBody} value={this.state.body} style={[s.wide(), s.high(400)].merge()}/>
    } else {
      return <MarkdownRenderer source={this.state.body}/>
    }
  },
  render () {
    return <div style={[].merge()}>
      {this.renderBody()}
    </div>
  }
})
