import React from 'react'

export default class Banner extends React.Component {
  constructor (props) {
    super(props)
    this.state = {height: 0, image: images[this.props.image] || this.props.image}
  }

  render () {
    return this.props.image ? <div style={s.wide(), s.lineHeight(0)}>
      <div style={[s.rect({h: this.state.height}), s.absolute, s.left(), s.lineHeight("initial"), s.bgImage(this.state.image), {backgroundSize: "cover", backgroundPosition: "center"}].merge()}>
        {this.props.children}
      </div>

      <img style={[s.rect({h: this.state.height, w: 0})].merge()} src={this.state.image} onLoad={() => {this.setState({height: window.innerHeight})}}/>
    </div> : null
  }
}
