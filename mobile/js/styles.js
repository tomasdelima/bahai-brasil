import {Dimensions} from 'react-native'

var colors = {yellow: '#FBBC31', darkYellow: '#DB9C11'}

var styles = {
  posts: {
    container: { backgroundColor: '#eee' },
  },
  category: {
    container:  {  },
    container2: { flex: 1, flexDirection: 'row' },
    showMore:   { flex: 1, textAlign: 'center', backgroundColor: colors.yellow, borderRadius: 3 },
    name:       { textAlignVertical: 'center' },
    icon:       { paddingRight: 10, paddingBottom: 7 },
  },
  post: {
    container: { marginBottom: 3, backgroundColor: 'white', borderRadius: 3 },
    title:     { flex: 1, textAlign: 'left' },
    date:      { flex: 0, paddingLeft: 10, paddingRight: 10, textAlignVertical: 'center', color: '#bbb', textAlign: 'right' },
    author:    { fontSize: 12, margin: 10, marginTop: 20, color: '#bbb', textAlign: 'right' },
    paragraph: { fontSize: 14, padding: 20 },
  },

  navbar: {
    container: { backgroundColor: '#FBBC31', height: 35, alignItems: 'center'},
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
    error: { backgroundColor: 'rgba(255, 0, 0, 0.5)' },
    success: { backgroundColor: 'rgba(0, 255, 0, 0.5)' },
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
  caption: { fontSize: 12, color: '#777', fontStyle: 'italic' },

  url:        { textDecorationLine: 'underline', color: '#469' },
  bold:       { fontWeight: 'bold', color: 'red' },
  italic:     { fontStyle: 'italic' },
  underline:  { textDecorationLine: 'underline' },
  translucid: { opacity: 0.6 },

  red:   { backgroundColor: 'rgba(255, 0, 0, 0.2)' },
  green: { backgroundColor: 'rgba(0, 255, 0, 0.2)' },
  blue:  { backgroundColor: 'rgba(0, 0, 255, 0.2)' },
  gray:  { backgroundColor: 'rgba(126, 126, 126, 0.5)' },
}

var c = styles.post.container
styles.post.banner = { borderTopLeftRadius: c.borderRadius, borderTopRightRadius: c.borderRadius, width: styles.wide(1) - c.padding*2 - c.margin*2 }

module.exports = styles
