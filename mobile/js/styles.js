module.exports = {
  post: {
    inline: {
      container: { padding: 20, borderBottomWidth: 1, borderColor: '#eee' },
      author: { fontSize: 16, color: '#bbb' },
      title: { fontSize: 18 },
    },
    full: {
      container: { padding: 10 },
      author: { fontSize: 22 },
      paragraph: { fontSize: 20, padding: 20 },
      title: { fontSize: 30 },
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

  row: { flexDirection: 'row' },
  pagePadding: { paddingBottom: 100 },

  left:    { textAlign: 'left'},
  right:   { textAlign: 'right'},
  center:  { textAlign: 'center'},
  quote:   { paddingHorizontal: 20, marginHorizontal: 10, backgroundColor: '#eee', borderRadius: 5 },
  indent1: { paddingLeft: 30 },
  indent2: { paddingLeft: 60 },
  indent3: { paddingLeft: 90 },
  indent4: { paddingLeft: 120 },

  bold:       { fontWeight: 'bold', color: 'red' },
  italic:     { fontStyle: 'italic' },
  underline:  { textDecorationLine: 'underline' },
  translucid: { opacity: 0.6 },

  red:   { backgroundColor: 'rgba(255, 0, 0, 0.2)' },
  green: { backgroundColor: 'rgba(0, 255, 0, 0.2)' },
  blue:  { backgroundColor: 'rgba(0, 0, 255, 0.2)' },
}