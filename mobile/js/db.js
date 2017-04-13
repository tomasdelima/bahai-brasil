import { AsyncStorage } from 'react-native'

const DB = {
  select: (table, where, indent) => {
    var t = performance.now()
    return AsyncStorage.getItem(table).then((r) => {
      var result = JSON.parse(r) || []
      var filteredResults = result.filter((item) => {
        var rr = true
        for (var key in where) { rr = rr && where[key].indexOf(item[key]) >= 0 }
        return rr
      })
      t = performance.now() - t
      console.log(indent + 'SELECT: ' + table + ' ' + (JSON.stringify(where) || '') + ' => ' + result.length + ' records, ' + t/1000 + ' seconds')
      return filteredResults
    })
  },
  get: (key) => {
    return AsyncStorage.getItem(key)
  },
  update: (table, objs, indent) => {
    var t = performance.now()
    console.log(indent + 'UPDATE: ' + objs.length + ' records')

    return DB.select(table,undefined, indent + '  ').then((result) => {
      t = performance.now() - t
      var objResult = {}
      result.map((item) => objResult[item.id] = item)
      objs.map((obj) => objResult[obj.id] = obj)
      result = []
      for (var key in objResult) { result.push(objResult[key]) }
      AsyncStorage.setItem(table, JSON.stringify(result))
      return result
    }).then((result) => {
      console.log(indent + 'UPDATE: ' + t/1000 + ' seconds')
      return result
    })
  },
  reset: (table) => {
    return AsyncStorage.removeItem(table)
  },
}

module.exports = DB
