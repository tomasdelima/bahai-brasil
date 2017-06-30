import {Dimensions} from 'react-native'
// fontFamily: ['bree_serif', 'quattrocento', 'colwell', 'oswaldesque_light', 'oswaldesque_regular', 'oswaldesque_bold']

var Width = Dimensions.get('window').width
var Height = Dimensions.get('window').height

var border = 3 // Default border radius

var c = {
  yellow: '#FBBC31', darkYellow: '#DB9C11',
  blue: '#469',
  pale: '#eee', pale2: '#bbb', pale3: '#777',
  dark: '#333', veryDark: '#111',
}

var rgba = (r, g, b, a) => 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')'

var t = {
  red:   (alpha) => rgba(255, 0, 0, alpha),
  green: (alpha) => rgba(0, 255, 0, alpha),
  blue:  (alpha) => rgba(0, 0, 255, alpha),

  yellow: (alpha) => rgba(126, 126, 0, alpha),
  purple: (alpha) => rgba(126, 0, 126, alpha),
  water:  (alpha) => rgba(0, 126, 126, alpha),
  darkWater: (alpha) => rgba(0, 40, 40, alpha),

  gray: (alpha) => rgba(126, 126, 126, alpha),
  dark: (alpha) => rgba(16, 16, 16, alpha),
}

var styles = {
  posts: {
    container: { backgroundColor: c.pale },
  },

  category: {
    container:  {  },
    container2: { flex: 1, flexDirection: 'row', justifyContent: 'flex-start' },
    showMore:   { flex: 1, textAlign: 'center', backgroundColor: t.darkWater(0.8), color: 'white', borderRadius: border },
    name:       { color: c.dark, fontSize: 18, flexWrap: "wrap", width: Width - 55 }, // 75 = s.category.icon.marginRight + 2 * s.category.container.margin
    icon:       { marginRight: 10, color: t.darkWater(0.8) },
  },

  post: {
    container: { marginBottom: 3, backgroundColor: 'white', borderRadius: border },
    banner: {
      container: { borderTopLeftRadius: 3, borderTopRightRadius: 3, overflow: 'hidden' },
      image: {  },
    },
    title:     { flex: 1, textAlign: 'left', textAlignVertical: 'center' },
    date:      { flex: 0, paddingLeft: 10, paddingRight: 10, textAlignVertical: 'center', color: c.pale2, textAlign: 'right' },
    paragraph: { fontSize: 15, padding: 20 },

    gallery: {
      container: {
        justifyContent: 'center',
        height: Height,
        width: Width,
        backgroundColor: c.veryDark,
        top: 0,
        left: 0,
      },
      back: {
        position: 'absolute',
        left: 0,
        top: 0,
        margin: 10,
        width: 60,
        height: 60,
        borderRadius: 60,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: t.dark(0.5),
        color: 'white',
      },
    },
  },

  navbar: {
    container:     { backgroundColor: t.darkWater(0.8), height: 50, alignItems: 'center'},
    center:        { flex: 1 },
    title:         { textAlign: 'center', fontSize: 20, lineHeight: 19, color: 'white' },
    logo:          { marginLeft: 3, height: 50, width: 50 },
    sideContainer: { flex: 0, width: 50 },
    sideButton:    { textAlign: 'center', flex: 1, textAlignVertical: 'center', backgroundColor: t.darkWater(0.5), color: 'white' },
  },

  message: {
    container: {
    },
    body: {
      paddingTop: 1,
      textAlign: 'center',
      fontSize: 12,
      color: 'white',
    },
    close: {
      position: 'absolute',
      right: 0,
      top: 0,
      padding: 3,
    },
    error:   { backgroundColor: t.red(0.5) },
    warning: { backgroundColor: c.yellow },
    success: { backgroundColor: t.water(0.7) },
  },

  md: {},

  flex: { flex: 1 },
  row:  { flexDirection: 'row' },
  wide: (ratio) => { return {width: Width * ratio}},
  high: (ratio) => { return {height: Height * ratio}},
  Width: Width,
  Height: Height,
  pagePadding: { paddingBottom: 35 },

  left:    { textAlign: 'left' },
  right:   { textAlign: 'right' },
  center:  { textAlign: 'center' },
  // justify: { textAlign: 'justify' }, DOES NOT WORK
  quote:   { paddingHorizontal: 20, marginHorizontal: 10, backgroundColor: '#eee', borderRadius: border },
  indent1: { paddingLeft: 30 },
  indent2: { paddingLeft: 60 },
  indent3: { paddingLeft: 90 },
  indent4: { paddingLeft: 120 },
  caption: { fontSize: 12, color: c.pale3, fontStyle: 'italic' },

  url:        { textDecorationLine: 'underline', color: c.blue },
  lightUrl:   { textDecorationLine: 'underline', color: c.white },
  bold:       { fontWeight: 'bold', color: t.water(1) },
  italic:     { fontStyle: 'italic' },
  underline:  { textDecorationLine: 'underline' },
  translucid: { opacity: 0.6 },

  red:   { backgroundColor: t.red(0.2) },
  green: { backgroundColor: t.green(0.2) },
  blue:  { backgroundColor: t.blue(0.2) },
  yellow:{ backgroundColor: t.yellow(0.2) },
  gray:  { backgroundColor: t.gray(0.5) },
  t: t,
}

module.exports = styles
