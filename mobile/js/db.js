import { AsyncStorage } from 'react-native'

const DB = {
  shouldLog: true,
  select: (table, where, indent) => {
    var t = new Date()
    return AsyncStorage.getItem(table).then((r) => {
      var result = JSON.parse(r) || []
      var filteredResults = result.filter((item) => {
        var rr = true
        for (var key in where) { rr = rr && where[key].indexOf(item[key]) >= 0 }
        return rr
      })
      t = new Date() - t
      if (DB.shouldLog) console.log(indent + 'SELECT: ' + table + ' ' + (JSON.stringify(where) || '') + ' => ' + result.length + ' records, ' + t/1000 + ' seconds')
      return filteredResults
    })
  },
  get: (key) => {
    return AsyncStorage.getItem(key)
  },
  update: (table, objs, indent) => {
    var t = new Date()
    if (objs.constructor.name != 'Array') objs = [objs]
    if (DB.shouldLog) console.log(indent + 'UPDATE: ' + objs.length + ' records')

    return DB.select(table, undefined, indent + '  ').then((result) => {
      t = new Date() - t
      var objResult = {}
      result.map((item) => objResult[item.id] = item)
      objs.map((obj) => objResult[obj.id] = obj)
      result = []
      for (var key in objResult) { result.push(objResult[key]) }
      AsyncStorage.setItem(table, JSON.stringify(result))
      return result
    }).then((result) => {
      if (DB.shouldLog) console.log(indent + 'UPDATE: ' + t/1000 + ' seconds')
      return result
    })
  },
  reset: (table) => {
    return AsyncStorage.removeItem(table)
  },
}

module.exports = DB
