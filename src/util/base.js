
export const togglePair = (pair) => (cur) => {
  if (!pair || pair.length !== 2) {
    return cur
  }

  return pair.filter(item => item !== cur)[0]
}

export const reverseKeyVal = (target) => {
  let ret = {}

  for (var key in target) {
    if (target.hasOwnProperty(key) && typeof target[key] !== 'undefined') {
      ret[target[key]] = key
    }
  }

  return ret
}

export const sortByIds = (source, ids) => {
  return source.sort((a, b) => {
    return ids.indexOf(a.id) > ids.indexOf(b.id) ? 1 : -1
  })
}

export const array2map = (keyField, valField) => (arr) => {
  let ret = {}

  arr.forEach(item => {
    ret[item[keyField]] = item[valField]
  })

  return ret
}

export const options2map = array2map('value', 'label')

export function guid () {
  function s4 () {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4()
}

export function isEmptyObject (obj) {
  if (obj == null) return true
  if (Array.isArray(obj) || Object.prototype.toString.call(obj) === '[object String]') return obj.length === 0
  for (var key in obj) if (obj.hasOwnProperty(key)) return false
  return true
}
