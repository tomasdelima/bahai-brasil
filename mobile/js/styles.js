import {Dimensions} from 'react-native'

var styles = {
  posts: {
    container: { backgroundColor: '#eee' },
  },
  post: {
    inline: {
      container: { margin: 7, marginBottom: 0, backgroundColor: 'white', borderRadius: 3},
      container2: { padding: 5, paddingTop: 5 },
      title:    { fontSize: 16, textAlign: 'center' },
      category: { fontSize: 13, color: '#bbb', flex: 1, textAlign: 'right' },
      division: { fontSize: 8,  color: '#bbb', flex: 0, paddingVertical: 5, paddingHorizontal: 10 },
      date:     { fontSize: 13, color: '#bbb', flex: 1 },
    },
    full: {
      container: { padding: 10, backgroundColor: 'white' },
      author:    { fontSize: 12, margin: 10, marginTop: 20, color: '#bbb', textAlign: 'right' },
      paragraph: { fontSize: 14, padding: 20 },
      title:     { fontSize: 20 },
    },
  },

  navbar: {
    container: { backgroundColor: '#FBBC31', height: 35, alignItems: 'center'},
    left:   { flex: 0, width: 50 },
    center: { flex: 1 },
    right:  { flex: 0, textAlign: 'center', width: 50 },
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
}

var c = styles.post.inline.container
styles.post.inline.banner = { borderTopLeftRadius: c.borderRadius, borderTopRightRadius: c.borderRadius, width: styles.wide(1) - c.padding*2 - c.margin*2, height: 100 }

module.exports = styles
