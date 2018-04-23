import React from 'react'
import Optimized from '../Lib/Optimized'

export default class Home extends Optimized {
  componentDidMount() {
    $(window).scrollTop(0)
  }

  render () {
    return <Flex start1 wide stretch2 column>
      <TopBar overlay scroll/>

      {s.isMobile() ? <Banner image={home.banner_url}/> : <Video video={home.video} quote={home.video_quote} author={home.video_author}/>}
      <GreenStrip/>

      <Flex column bgImage={images.homepageBackground} contain>
        <Flex column alignCenter padding={100}>
          {home.body.split('\n').map((paragraph, i) =>
            <Flex key={i} padding={15} opacity={0.8} size="x-large" text color={t.white}>{paragraph}</Flex>
          )}
          {/*<Button to="foo" margin={45} padding={20} label="Encontre bahá'ís perto de você"/>*/}
        </Flex>

        <Carousel itemWidth={s.isMobile() && 600} items={pages}/>
      </Flex>

      <Footer/>
    </Flex>
  }
}
