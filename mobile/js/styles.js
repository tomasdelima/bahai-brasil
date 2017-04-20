import {Dimensions} from 'react-native'

var styles = {
  posts: {
    container: { backgroundColor: '#eee' },
  },
  post: {
    inline: {
      container: { margin: 7, marginBottom: 0, padding: 10, backgroundColor: 'white', borderRadius: 3},
      title:  { fontSize: 16 },
      author: { fontSize: 13, color: '#bbb', flex: 3},
      date:   { fontSize: 13, color: '#bbb', flex: 2, textAlign: 'right' },
    },
    full: {
      container: { padding: 10, backgroundColor: 'white' },
      author:    { fontSize: 22 },
      paragraph: { fontSize: 20, padding: 20 },
      title:     { fontSize: 30 },
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
  caption: { fontSize: 16, color: '#555' },

  url:        { textDecorationLine: 'underline', color: '#469' },
  bold:       { fontWeight: 'bold', color: 'red' },
  italic:     { fontStyle: 'italic' },
  underline:  { textDecorationLine: 'underline' },
  translucid: { opacity: 0.6 },

  red:   { backgroundColor: 'rgba(255, 0, 0, 0.2)' },
  green: { backgroundColor: 'rgba(0, 255, 0, 0.2)' },
  blue:  { backgroundColor: 'rgba(0, 0, 255, 0.2)' },
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  }
}

styles.post.inline.banner = { marginBottom: 5, width: styles.wide(1) - styles.post.inline.container.padding*2 - styles.post.inline.container.margin*2, height: 100 }

module.exports = styles
