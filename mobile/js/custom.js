Array.prototype.compact = function () { return this.filter((a) => a) }
Array.prototype.unique = function () { return this.filter((a, i) => this.indexOf(a) === i) }
Array.prototype.flatten = function () { return this.map((a) => (a.constructor.name == 'Array' && a.length == 1) ? a[0] : a) }

Object.merge = (obj1, obj2) => {var obj3 = JSON.parse(JSON.stringify(obj1)); Object.keys(obj2).map((key) => obj3[key] = obj2[key]); return obj3}
Object.map = (obj, func) => Object.keys(obj).map((k, i) => func(k, obj[k], i))
