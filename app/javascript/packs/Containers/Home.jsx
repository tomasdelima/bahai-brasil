import React from 'react'
import Optimized from '../Lib/Optimized'

export default class Home extends Optimized {
  initialize () {
    this.bind = ["setFindBahaisButtonColor"]
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps (nextProps) {
  }

  setFindBahaisButtonColor (color) {
    this.setState({findBahaisButtonColor: color})
  }

  render () {
    var a = {image: images.vidaEspiritualBanner, title: 'A VIDA DO ESPÍRITO', text1: "“Tu és Minha lâmpada e Minha luz está em ti. Que obtenhas dela teu resplendor e não aspires a outro senão a Mim.”", text2: "–Bahá'u'lláh", buttonLabel: "Leia mais >", to: "foo"}

    return <Flex wide stretch2 column>
      <Banner image={images.homeBanner} body='“...em meio à desintegração, está tomando forma um novo modo de vida coletiva que dá expressão prática a tudo que é divino nos seres humanos.”'/>
      <Flex column bgImage={images.homepageBackground}>
        <Flex column alignCenter padding={100}>
          <Flex wide={945} padding={15} opacity={0.8} size={28} style={{color: t.white, fontFamily: 'Roboto'}}>Os bahá'ís se esforçam para contribuir para a construção de uma sociedade justa e unida ao lado de pessoas, movimentos e organizações que compartilham desse mesmo ideal.</Flex>
          <Flex wide={945} padding={15} opacity={0.8} size={28} style={{color: t.white, fontFamily: 'Roboto'}}>Inspirados pela visão de Bahá'u'lláh, o princípio que inspira e orienta nosso esforços é o da unicidade da humanodade. Acreditamos que toda a humanodade está interligada e pode viver como um só corpo: um sistema complexo, diverso em seu interior, organicamente interdependente, dinâmico e vivo.</Flex>
          <Flex radius={4} margin={45} size={17.5} BG={this.state.findBahaisButtonColor} onMouseEnter={() => this.setFindBahaisButtonColor(t.green)} onMouseLeave={() => this.setFindBahaisButtonColor("transparent")} style={[s.animate("all", 300), {border: "2px solid " + t.green, color: t.white, fontFamily: 'Roboto'}]}>
            <Link to="foo" style={[s.padding(20), s.noDecoration, {color: t.white}].merge()}>Encontre bahá'ís perto de você</Link>
          </Flex>
        </Flex>

        <Carousel items={[a, a, a]}/>
      </Flex>
    </Flex>
  }
}
