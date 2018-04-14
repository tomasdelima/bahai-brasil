import React from 'react'
import Optimized from '../Lib/Optimized'

export default class Page extends Optimized {
  initialize () {
    this.page = pages.filter(page => page.slug == this.props.match.path)[0]
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
        <Banner height={600} image={this.page.banner_url}/>
        <Flex column bgImage={images.whiteBackground}>
          <Flex column alignCenter padding={100}>
            <img src={images.star} style={s.wide(65)}/>
            <Flex padding={15} opacity={0.8} size={29} text color={t.green}>{this.page.quote}</Flex>
            <Flex padding={15} opacity={0.8} size={25} text color={t.green} noWrap large>–{this.page.author}</Flex>
          </Flex>
        </Flex>

        <Flex color={t.darkGray} text style={[s.padding(35, 120)]} column>
          <Flex padding={20} opacity={0.8} size={39} noWrap bold color={t.black}>{this.page.title}</Flex>

          {this.page.body.split("\n").map((paragraph, i) => <Flex key={i} size={23} padding={15}>{paragraph}</Flex>)}

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
