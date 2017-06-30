var s = require('./common-styles')

s.navbar.container.paddingTop = 20
s.navbar.container.height += 20
s.navbar.sideButton.paddingTop = 10

s.navbar.title.fontFamily = 'bree serif'

s.md.image = (w, h) => {var width = s.wide(1).width - 40; return [{width: width, height: width * h / w, margin: 20}]}

module.exports = s