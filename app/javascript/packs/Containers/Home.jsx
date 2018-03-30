import React from 'react'
import Optimized from '../Lib/Optimized'

export default class Home extends Optimized {
  initialize () {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps (nextProps) {
  }

  render () {
    return <Flex wide stretch2 column>
      <Banner image={images.homeBanner} body='“...em meio à desintegração, está tomando forma um novo modo de vida coletiva que dá expressão prática a tudo que é divino nos seres humanos.”'/>
      <Flex column alignCenter bgImage={images.homepageBackground} padding={100}>
        <Flex wide={945} padding={15} opacity={0.8} size={28} style={{color: t.white, fontFamily: 'Roboto'}}>Os bahá'ís se esforçam para contribuir para a construção de uma sociedade justa e unida ao lado de pessoas, movimentos e organizações que compartilham desse mesmo ideal.</Flex>
        <Flex wide={945} padding={15} opacity={0.8} size={28} style={{color: t.white, fontFamily: 'Roboto'}}>Inspirados pela visão de Bahá'u'lláh, o princípio que inspira e orienta nosso esforços é o da unicidade da humanodade. Acreditamos que toda a humanodade está interligada e pode viver como um só corpo: um sistema complexo, diverso em seu interior, organicamente interdependente, dinâmico e vivo.</Flex>
        <Flex radius={4} margin={45} padding={20} size={17.5} style={{border: "2px solid " + t.green, color: t.white, fontFamily: 'Roboto'}}>Encontre bahá'ís perto de você</Flex>
      </Flex>
    </Flex>
  }
}
