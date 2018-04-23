import React from 'react'
import Optimized from '../Lib/Optimized'

export default class Footer extends Optimized {
  render () {
    var m = s.isMobile()
    var fontSize = m ? "xx-large" : "large"
    var style = [s.noDecoration, s.size(fontSize), s.text, s.color(t.white)].merge()

    return <Flex wrap spacedOut BG={t.darkGreen} wide style={[s.padding(43, 0), style]}>
      <Flex column style={m && s.wide("50%")}>
        <img style={s.wide(m ? "80%" : 175)} src={images.logo}/>
        <Flex style={s.margin(15, 0, 0)}>Copyright ©{new Date().getFullYear()}</Flex>
      </Flex>

      <Flex stretch2 column style={m && s.wide("50%")}>
        <Flex>info@bahai.org.br</Flex>
        <Flex>(+55 61) 3255 2200</Flex>

        <Flex spacedOut size={m ? 100 : 32} style={s.margin(15, 0, 0)}>
          <div className="fa fa-facebook-square"/>
          <div className="fa fa-youtube"/>
        </Flex>
      </Flex>

      {!m && <Flex column start2 lineHeight="27px">
        {pages.map((page, i) => <Button key={i} to={page.slug} style={style} label={page.title} size={fontSize} border="none" margin="0" padding="0" bgActiveColor="transparent" activeColor={t.green} />)}
      </Flex>}

      {/*<Flex start2 column style={m && [s.wide("100%"), s.center2, s.margin(50, 0, 0)]}>
        <Flex>Receba nossa newsletter</Flex>

        <Flex style={s.margin(15, 0, 0)}>
          <style>
            #newsletter-email::placeholder {JSON.stringify(style).replace(/,/g,';').replace(/"/g,'')}
          </style>

          <input id="newsletter-email" placeholder="email" type="email" style={[style, s.padding(12, 20), s.noBorder, s.radius("4px 0 0 4px"), s.BG(t.gray)].merge()}/>
          <Button to="foo" label="inscrever-se" size={fontSize} margin="0" bgColor={t.green} radius="0 4px 4px 0"/>
        </Flex>
      </Flex>*/}
    </Flex>
  }
}
