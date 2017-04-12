import { AsyncStorage } from 'react-native'

const DB = {
  select: (table, where, orderBy) => {
    return AsyncStorage.getItem(table).then((r) => {
      var result = JSON.parse(r) || []
      console.log('SELECT    : ' + table + ' ' + JSON.stringify(where) + ' => ' + result.length + ' records')
      return result.filter((item) => {
        var rr = true
        for (var key in where) { rr = rr && where[key].indexOf(item[key]) >= 0 }
        return rr
      })
    })
  },
  get: (key) => {
    return AsyncStorage.getItem(key)
  },
  update: (table, objs) => {
    console.log('UPDATE    : ' + objs.length + ' records')

    return DB.select(table).then((result) => {
      var objResult = {}
      result.map((item) => objResult[item.id] = item)
      objs.map((obj) => objResult[obj.id] = obj)
      result = []
      for (var key in objResult) { result.push(objResult[key]) }
      AsyncStorage.setItem(table, JSON.stringify(result))
      return result
    })
  },
  reset: (table) => {
    return AsyncStorage.removeItem(table)
  },
}

module.exports = DB
