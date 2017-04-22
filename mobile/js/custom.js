Array.prototype.compact = function () { return this.filter((a) => a) }
Array.prototype.flatten = function () { return this.map((a) => (a.constructor.name == 'Array' && a.length == 1) ? a[0] : a) }
