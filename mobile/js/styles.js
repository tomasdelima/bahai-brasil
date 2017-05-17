import {Dimensions} from 'react-native'

var c = {
  yellow: '#FBBC31', darkYellow: '#DB9C11',
  blue: '#469',
  pale: '#eee', pale2: '#bbb', pale3: '#777',
  dark: '#333',
}

var rgba = (r, g, b, a) => 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')'

var t = {
  red:   (alpha) => rgba(255, 0, 0, alpha),
  green: (alpha) => rgba(0, 255, 0, alpha),
  blue:  (alpha) => rgba(0, 0, 255, alpha),

  yellow: (alpha) => rgba(126, 126, 0, alpha),
  purple: (alpha) => rgba(126, 0, 126, alpha),
  water:  (alpha) => rgba(0, 126, 126, alpha),

  gray: (alpha) => rgba(126, 126, 126, alpha),
}

var styles = {
  posts: {
    container: { backgroundColor: c.pale },
  },
  category: {
    container:  {  },
    container2: { flex: 1, flexDirection: 'row', marginBottom: 10 },
    showMore:   { flex: 1, textAlign: 'center', backgroundColor: c.yellow, borderRadius: 3 },
    name:       { textAlignVertical: 'center', color: c.dark },
    icon:       { paddingRight: 10, paddingBottom: 7, color: c.dark },
  },
  post: {
    container: { marginBottom: 3, backgroundColor: 'white', borderRadius: 3 },
    title:     { flex: 1, textAlign: 'left' },
    date:      { flex: 0, paddingLeft: 10, paddingRight: 10, textAlignVertical: 'center', color: c.pale2, textAlign: 'right' },
    author:    { fontSize: 12, margin: 10, marginTop: 20, color: c.pale2, textAlign: 'right' },
    paragraph: { fontSize: 14, padding: 20 },
  },

  navbar: {
    container: { backgroundColor: c.yellow, height: 35, alignItems: 'center'},
    left:   { flex: 0, width: 50 },
    center: { flex: 1 },
    right:  { flex: 0, width: 50 },
    title:  { textAlign: 'center' },
    return: { textAlign: 'center' },
  },

  message: {
    container: {
    },
    body: {
      paddingTop: 1,
      textAlign: 'center',
      fontSize: 12,
    },
    close: {
      position: 'absolute',
      right: 0,
      top: 0,
      padding: 3,
    },
    error: { backgroundColor: t.red(0.5) },
    success: { backgroundColor: t.green(0.5) },
  },

  flex: { flex: 1 },
  row:  { flexDirection: 'row' },
  wide: (ratio) => { return {width: Dimensions.get('window').width * ratio}},
  high: (ratio) => { return {height: Dimensions.get('window').height * ratio}},
  pagePadding: { paddingBottom: 35 },

  left:    { textAlign: 'left' },
  right:   { textAlign: 'right' },
  center:  { textAlign: 'center' },
  // justify: { textAlign: 'justify' }, DOES NOT WORK
  quote:   { paddingHorizontal: 20, marginHorizontal: 10, backgroundColor: '#eee', borderRadius: 5 },
  indent1: { paddingLeft: 30 },
  indent2: { paddingLeft: 60 },
  indent3: { paddingLeft: 90 },
  indent4: { paddingLeft: 120 },
  caption: { fontSize: 12, color: c.pale3, fontStyle: 'italic' },

  url:        { textDecorationLine: 'underline', color: c.blue },
  bold:       { fontWeight: 'bold', color: 'red' },
  italic:     { fontStyle: 'italic' },
  underline:  { textDecorationLine: 'underline' },
  translucid: { opacity: 0.6 },

  red:   { backgroundColor: t.red(0.2) },
  green: { backgroundColor: t.green(0.2) },
  blue:  { backgroundColor: t.blue(0.2) },
  yellow:{ backgroundColor: t.yellow(0.2) },
  gray:  { backgroundColor: t.gray(0.5) },
}

var pc = styles.post.container
styles.post.banner = { borderTopLeftRadius: pc.borderRadius, borderTopRightRadius: pc.borderRadius, width: styles.wide(1) - pc.padding*2 - pc.margin*2 }

module.exports = styles
