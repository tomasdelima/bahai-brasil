import React from 'react'
import Optimized from '../Lib/Optimized'

export default class Home extends Optimized {
  componentDidMount() {
    $(window).scrollTop(0)
  }

  render () {
    var a = {image: images.vidaEspiritualBanner, title: 'A VIDA DO ESPÍRITO', text1: "“Tu és Minha lâmpada e Minha luz está em ti. Que obtenhas dela teu resplendor e não aspires a outro senão a Mim.”", text2: "–Bahá'u'lláh", buttonLabel: "Leia mais >", to: "/vida-espiritual"}

    return <Flex start1 wide stretch2 column>
      <TopBar overlay/>

      <Video zindex={12} videos={homeVideos} body='“...em meio à desintegração, está tomando forma um novo modo de vida coletiva que dá expressão prática a tudo que é divino nos seres humanos.”'/>
      <GreenStrip zindex={12}/>

      <Flex column bgImage={images.homepageBackground} contain>
        <Flex column alignCenter padding={100}>
          <Flex padding={15} opacity={0.8} size="x-large" text color={t.white}>Os bahá'ís se esforçam para contribuir para a construção de uma sociedade justa e unida ao lado de pessoas, movimentos e organizações que compartilham desse mesmo ideal.</Flex>
          <Flex padding={15} opacity={0.8} size="x-large" text color={t.white}>Inspirados pela visão de Bahá'u'lláh, o princípio que inspira e orienta nosso esforços é o da unicidade da humanodade. Acreditamos que toda a humanodade está interligada e pode viver como um só corpo: um sistema complexo, diverso em seu interior, organicamente interdependente, dinâmico e vivo.</Flex>
          <Button to="foo" margin={45} padding={20} label="Encontre bahá'ís perto de você"/>
        </Flex>

        <Carousel itemWidth={s.isMobile() && 600} items={[a, a, a]}/>

        <Flex bgImage={images.greenBackground} wide style={[s.padding(55, 0), {borderBottom: "9px solid " + t.green}]}>
          <Flex end2 spacedOut wide style={s.margin(0, 180)}>
            <BottomLink icon={images.jornal}    label="Notícias >" to="foo"/>
            <BottomLink icon={images.star}      label="Orações >"  to="foo"/>
            <BottomLink icon={images.microfone} label="Imprensa >" to="foo"/>
          </Flex>
        </Flex>
      </Flex>

      <Footer/>
    </Flex>
  }
}
