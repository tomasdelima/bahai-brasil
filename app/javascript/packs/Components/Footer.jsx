import React from 'react'
import Optimized from '../Lib/Optimized'

export default class Footer extends Optimized {
  initialize () {this.bind = []}
  componentWillMount() {}
  componentDidMount() {}
  componentWillReceiveProps (nextProps) {}
  shouldComponentUpdate (nextProps, nextState) {return true}
  componentWillUpdate (nextProps, nextState) {}
  componentDidUpdate (prevProps, prevState) {}
  componentWillUnmount () {}
  componentDidCatch (prevProps, prevState) {}

  render () {
    var style = [s.noDecoration, s.size(19), {fontFamily: 'Roboto', color: t.white}].merge()

    return <Flex spacedOut BG={t.darkGreen} wide style={[s.padding(43, 0), style]}>
      <Flex column>
        <img style={s.wide(175)} src={images.logo}/>
        <Flex style={s.margin(15, 0, 0)}>Copyright ©{new Date().getFullYear()}</Flex>
      </Flex>

      <Flex stretch2 column>
        <div>info@bahai.org.br</div>
        <div>(+55 61) 3255 2200</div>

        <Flex spacedOut size={32} style={s.margin(15, 0, 0)}>
          <div className="fa fa-facebook-square"/>
          <div className="fa fa-youtube"/>
        </Flex>
      </Flex>

      <Flex column start2 lineHeight="27px">
        <Link to={"/foo"} style={style}>Bahá'ís no Brasil</Link>
        <Link to={"/foo"} style={style}>Vida Espiritual</Link>
        <Link to={"/foo"} style={style}>Notícias</Link>
        <Link to={"/foo"} style={style}>Orações</Link>
        <Link to={"/foo"} style={style}>Imprensa</Link>
      </Flex>

      <Flex start2 column>
        <div>Receba nossa newsletter</div>

        <Flex style={s.margin(15, 0, 0)}>
          <style>
            ::placeholder {JSON.stringify(style).replace(/,/g,';').replace(/"/g,'')}
          </style>

          <input id="foo" placeholder="email" style={[style, s.high(22), s.padding(12, 20), s.noBorder, s.radius("4px 0 0 4px"), s.BG(t.gray)].merge()}/>
          <Button to="foo" label="inscrever-se" margin="0" bgColor={t.green} radius="0 4px 4px 0"/>
        </Flex>
      </Flex>
    </Flex>
  }
}
