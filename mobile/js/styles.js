module.exports = {
  post: {
    inline: {
      container: { padding: 20, borderBottomWidth: 1, borderColor: '#eee' },
      author: { fontSize: 17 },
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
    container: { backgroundColor: '#FBBC31', height: 30},
    title:  { flex: 1, textAlign: 'center' },
    left:   { flex: 0, width: 50 },
    right:  { flex: 0, textAlign: 'center', width: 50 },
    return: { textAlign: 'center' },
  },

  row: { flexDirection: 'row' },
  pagePadding: { paddingBottom: 100 },

  left:    { textAlign: 'left'},
  right:   { textAlign: 'right'},
  center:  { textAlign: 'center'},
  quote:   { paddingHorizontal: 20, marginHorizontal: 10, backgroundColor: '#d9d9d9', borderRadius: 10 },
  indent1: { paddingLeft: 30 },
  indent2: { paddingLeft: 60 },

  red:   { backgroundColor: 'rgba(255, 0, 0, 0.2)' },
  green: { backgroundColor: 'rgba(0, 255, 0, 0.2)' },
  blue:  { backgroundColor: 'rgba(0, 0, 255, 0.2)' },
}