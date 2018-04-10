import React from 'react'
import Optimized from '../Lib/Optimized'

export default class VidaEspiritual extends Optimized {
  initialize () {
    this.bind = []
    this.state = {}
  }

  componentDidMount() {
    $(window).scrollTop(0)
  }

  setFindBahaisButtonColor (color) {
    this.setState({findBahaisButtonColor: color})
  }

  render () {
    return <Flex start1 column optimize={false}>
      <TopBar/>

      <Flex wide stretch2 column>
        <Banner height={600} image={images.vidaEspiritualBanner}/>
        <Flex column bgImage={images.whiteBackground}>
          <Flex column alignCenter padding={100}>
            <img src={images.star} style={s.wide(65)}/>
            <Flex padding={15} opacity={0.8} size={29} text color={t.green}>“Tu és Minha lâmpada, e Minha luz está em ti. Que obtenhas dela teu resplendor e não aspires a outro senão a Mim.”</Flex>
            <Flex padding={15} opacity={0.8} size={25} text color={t.green}>–Bahá'u'lláh</Flex>
          </Flex>
        </Flex>

        <Flex color={t.darkGray} text style={[s.padding(35, 120)]} column>
          <Flex padding={20} opacity={0.8} size={39} noWrap bold color={t.black}>VIDA ESPIRITUAL</Flex>
          <Flex size={23} padding={15}>Os escritos bahá’ís afirmam que todos os seres humanos foram criados da mesma substância por um mesmo Criador. Cada um é dotado de uma alma imortal que está exaltada acima da matéria e não possui distinção de gênero, cor, nacionalidade ou classe social.</Flex>
          <Flex size={23} padding={15}>Trilhamos um caminho espiritual na medida em que nos esforçamos para progredir espiritual e intelectualmente e contribuir para a melhora da sociedade. Esse caminho confere significado e propósito as nossas vidas.</Flex>
          <Flex size={23} padding={15}>Através da oração, do estudo e aplicação das escrituras sagradas, da aquisição de conhecimento, do empenho em melhorar nossa conduta e superar testes e dificuldades e do serviço à humanidade, purificamos os espelhos dos nossos corações e mentes e nos tornamos capazes de refletir a luz divina.</Flex>
          <Flex size={23} padding={15}>Ao assim fazer, adquirimos as qualidades divinas que precisamos na vida vindoura. Quando o corpo morre, a alma continua a progredir numa jornada eterna em direção à perfeição.</Flex>

          <Flex start2 style={[s.isMobile() && s.column,s.margin(85, 0, 50)]}>
            <Card margin={10} to={"foo"} image={images.vidaEspiritualBanner} title="Vida e Morte" body="Pequena descrição ou citação pode vir aqui para introduzir o tema"/>
            <Card margin={10} to={"foo"} image={images.vidaEspiritualBanner} title="Porque sofremos" body="Pequena descrição ou citação pode vir aqui para introduzir o tema"/>
            <Card margin={10} to={"foo"} image={images.vidaEspiritualBanner} title="Familia" body="Pequena descrição ou citação pode vir aqui para introduzir o tema"/>
          </Flex>
        </Flex>
      </Flex>

      <GreenStrip/>

      <Footer/>
    </Flex>
  }
}
