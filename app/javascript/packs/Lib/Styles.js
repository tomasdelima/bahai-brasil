global.s = Object.assign({}, s, {
  text: {fontFamily: 'Roboto'},
  color: (clr) => ({color: clr}),
  contain: {backgroundSize: "cover"},
  isMobile: () => window.innerWidth <= 600 || [/Android/i, /webOS/i, /iPhone/i, /iPad/i , /iPod/i, /BlackBerry/i, /Windows Phone/i].reduce((m, v) => m || !!navigator.userAgent.match(v), false)
})