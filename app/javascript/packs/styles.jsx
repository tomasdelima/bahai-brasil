var join = (a) => {var b = ""; for (var i=0; i < a.length; i++) {b += a[i] + "px "}; return b}

var m = window.innerWidth <= 600 || [/Android/i, /webOS/i, /iPhone/i, /iPad/i , /iPod/i, /BlackBerry/i, /Windows Phone/i].reduce((m, v) => m || !!navigator.userAgent.match(v), false)

var c = {
  blue:      "#3399CC",
  darkBlue:  "#1A2438",
  gray:      "#333",
  grey:      (x) => {x = Math.round(x*2.55); return "rgb("+x+","+x+","+x+")"},
  lightGray: "#666",
  transparent: "transparent",
}

export default {
  relative:   {position: "relative"},
  absolute:   {position: "absolute"},
  fixed:      {position: "fixed"},
  block:      {display: "block"},
  inline:     {display: "inline-block"},
  hidden:     {display: "none"},
  flex:       {display: "flex"},
  wrap:       {flexWrap: "wrap"},
  column:     {flexDirection: "column"},
  rowReverse: {flexDirection: "row-reverse"},
  spacedOut:  {justifyContent: "space-around"},
  spacedIn:   {justifyContent: "space-between"},
  center1:    {justifyContent: "center"},
  center2:    {alignItems: "center"},
  stretch1:   {justifyContent: "stretch"},
  stretch2:   {alignItems: "stretch"},
  start1:     {justifyContent: "flex-start"},
  start2:     {alignItems: "flex-start"},
  end1:       {justifyContent: "flex-end"},
  end2:       {alignItems: "flex-end"},
  shrink:     (x) => {return {flexShrink: x}},
  grow:       (x) => {return {flexGrow: x}},
  scroll:     {overflow: "auto"},
  noWrap:     {whiteSpace: "nowrap"},

  lora:         {fontFamily: "Lora"},
  nunito:       {fontFamily: "Nunito"},
  pointer:      {cursor: "pointer"},
  noSelect:     {userSelect: "none", MozUserSelect:"none", WebkitUserSelect:"none", msUserSelect:"none"},
  noDrag:       {userDrag: "none", MozUserDrag:"none", WebkitUserDrag:"none", msUserDrag:"none"},
  noDecoration: {textDecoration: "none"},
  bold:         {fontWeight: "bold"},
  underline:    {textDecoration: "underline"},
  italic:       {fontStyle: "italic"},
  justify:      {textAlign: "justify"},
  alignCenter:  {textAlign: "center"},
  alignRight:   {textAlign: "right"},
  alignLeft:    {textAlign: "left"},

  blue:      {color: c.blue},
  darkBlue:  {color: c.darkBlue},
  gray:      {color: c.gray},
  grey:      function (x) {return {color: c.grey(x)}},
  lightGray: {color: c.lightGray},
  white:     {color: "white"},
  red:       {color: "red"},
  lightRed:  {color: "#F33"},

  blueBG:      {background: c.blue},
  darkBlueBG:  {background: c.darkBlue},
  opaqueBG:    {background: "rgba(0, 0, 0, 0.5)"},
  grayBG:      {background: "#4B4B4B"},
  lightGrayBG: {background: "#E1E1E3"},
  whiteBG:     {background: "white"},
  redBG:       {background: "red"},
  inset:       {boxShadow: "0px 1px 2px #BBB inset"},
  insetBlue:   {boxShadow: "0px 0.5px 0.5px " + c.darkBlue + " inset"},

  bgImage:      function (x)    {return {backgroundImage: "url(" + x + ")"}},
  zindex:       function (x)    {return {zIndex: x}},
  indent:       function (x)    {return {textIndent: x}},
  size:         function (x, y) {return {fontSize: (m && y) ? y : x}},
  lineHeight:   function (x, y) {return {lineHeight: ((m && y) ? y : x) + "px"}},
  wide:         function (x, y) {return {width:    (m && y) ? y : (x  || "100%")}},
  maxWidth:     function (x, y) {return {maxWidth:    (m && y) ? y : (x  || "100%")}},
  high:         function (x, y) {return {height:   (m && y) ? y : (x  || "100%")}},
  top:          function (x, y) {return {top:      (m && y) ? y : (x  || "100%")}},
  rect:         function (x, y) {x = (m && y) ? y : (x || {}); return [s.wide(x.w), s.high(x.h)].merge()},
  radius:       function (x)    {return {borderRadius: x}},
  opacity:      function (x)    {return {opacity: x}},
  square:       function (x)    {return {width: x, height: x}},
  circle:       function (x, y) {x = (m && y) ? y : x; return {borderRadius: 1000, width: x, height: x}},
  padding:      function ()     {return {padding: join(arguments)}},
  margin:       function ()     {return {margin:  join(arguments)}},
  border:       function (x, y) {return {border: x + "px solid " + y}},
  borderBottom: function (x, y) {return {borderBottom: x + "px solid " + y}},
  animate:      function (x, y) {return {transition: (x.constructor.prototype.name == "Array" ? x : [x]).join(",") + " " + (y||150) + "ms"}}
}

Object.merge = (obj1, obj2) => {obj1 = obj1 || {}; obj2 = obj2 || {};var obj3 = JSON.parse(JSON.stringify(obj1)); Object.keys(obj2).map((key) => obj3[key] = obj2[key]); return obj3}
Array.prototype.merge = function () { var obj = {}; this.map(i => obj = Object.merge(obj, i)); return obj }
Object.map = function (obj, func) { Object.keys(obj).map((k, i) => obj[k] = func(k, obj[k], i)); return obj }
Object.each = function (obj, func) { var arr = []; Object.keys(obj).map((k, i) => arr.push(func(k, obj[k], i))); return arr }
Object.reduce = function (obj, initial, func) { Object.keys(obj).map((k, i) => initial = func(initial, k, obj[k], i)); return initial }
Array.prototype.compact = function () { return this.filter((a) => a) }
Array.prototype.unique =  function () { return this.filter((a, i) => this.indexOf(a) === i) }
Array.prototype.flatten = function () { return this.map((a) => (a.constructor.name == 'Array' && a.length == 1) ? a[0] : a) }