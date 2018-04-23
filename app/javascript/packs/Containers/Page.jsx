import React from 'react'
import Optimized from '../Lib/Optimized'

export default class Page extends Optimized {
  initialize () {
    this.page = allPages.filter(page => page.slug == this.props.match.path)[0]
    this.setCards()
  }

  setCards () {
    var tempCards = this.page.sub_pages.length ? this.page.sub_pages : (this.page.parent_page || {}).sub_pages || []

    tempCards.map((card, i) => {
      if (card.id == this.page.id) tempCards.splice(i, 1)
    })

    this.cards = []
    this.cards[0] = tempCards.splice(Math.floor(Math.random() * tempCards.length), 1)[0]
    this.cards[1] = tempCards.splice(Math.floor(Math.random() * tempCards.length), 1)[0]
    this.cards[2] = tempCards.splice(Math.floor(Math.random() * tempCards.length), 1)[0]
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
        <Banner image={this.page.banner_url}/>
        <Flex column bgImage={images.whiteBackground}>
          <Flex column alignCenter padding={100}>
            <img src={images.star} style={s.wide(65)}/>
            <Flex padding={15} opacity={0.8} size={29} text color={t.green}>{this.page.quote}</Flex>
            <Flex padding={15} opacity={0.8} size={25} text color={t.green} noWrap large>–{this.page.author}</Flex>
          </Flex>
        </Flex>

        <Flex color={t.darkGray} text style={[s.padding(35, 120)]} column>
          <Flex padding={20} opacity={0.8} size={39} noWrap bold color={t.black}>{this.page.title}</Flex>

          {this.page.body.split("\n").map((paragraph, i) => <Flex key={i} size={23} padding={15}>
            <Markdown>{paragraph}</Markdown>
          </Flex>)}

          <Flex start2 style={[s.isMobile() && s.column,s.margin(85, 0, 50)]}>
            {this.cards.map((subPage, i) =>
              subPage && <Card key={i} margin={10} to={subPage.slug} image={subPage.banner_url} title={subPage.title} body={subPage.short_description}/>
            )}
          </Flex>
        </Flex>
      </Flex>

      <GreenStrip/>

      <Footer/>
    </Flex>
  }
}
