import React from 'react'

export default class GreenStrip extends React.Component {
  render () {
    return <Flex zindex={this.props.zindex} BG={t.green} high={9} wide/>
  }
}

