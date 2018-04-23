import React from 'react'
import Optimized from '../Lib/Optimized'

export default class Home extends Optimized {
  componentDidMount() {
    $(window).scrollTop(0)
  }

  render () {
    return <Flex start1 wide stretch2 column>
      <TopBar overlay scroll/>

      <Video videos={homeVideos} quote='“...que suas ações dia a dia possam ser belas preces.”' author='— ‘Abdu’l-Bahá'/>
      <GreenStrip/>

      <Flex column bgImage={images.homepageBackground} contain>
        <Flex column alignCenter padding={100}>
          <Flex padding={15} opacity={0.8} size="x-large" text color={t.white}>A comunidade bahá’í busca contribuir para a construção de uma sociedade unida e justa ao lado de pessoas, movimentos e organizações que compartilham desse mesmo ideal.</Flex>
          <Flex padding={15} opacity={0.8} size="x-large" text color={t.white}>Inspirados pela visão de Bahá'u'lláh, acreditamos que toda a humanidade pode viver como um só corpo: um sistema complexo, diverso em seu interior, organicamente interdependente, dinâmico e vivo.</Flex>
          <Flex padding={15} opacity={0.8} size="x-large" text color={t.white}>No Brasil, somos das mais diversas origens sociais e culturais aprendendo juntos a traduzir os princípios trazidos por Bahá’u’lláh em realidade.</Flex>
          {/*<Button to="foo" margin={45} padding={20} label="Encontre bahá'ís perto de você"/>*/}
        </Flex>

        <Carousel itemWidth={s.isMobile() && 600} items={pages}/>
      </Flex>

      <Footer/>
    </Flex>
  }
}
