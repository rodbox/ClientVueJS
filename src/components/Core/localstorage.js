import _ from 'lodash'

class Locstorage {
  constructor () {
    this.state = {
      data: localStorage
    }
  }

  set (index, data) {
    let val = (typeof data === 'object') ? JSON.stringify(data) : data
    localStorage.setItem(index, val)
    return data
  }

  get (index, type, def) {
    if (localStorage[index] !== undefined) {
      let val = localStorage[index]
      if (type === 'json') {
        val = JSON.parse(val)
      } else if (type === 'int') {
        val = parseInt(val)
      } else if (type === 'float') {
        val = parseFloat(val)
      } else if (type === 'bool') {
        val = JSON.parse(val)
      }
      return val
    } else if (def !== undefined) {
      return this.set(index, def)
    } else {
      return ''
    }
  }

  merge (index, data) {
    let val = this.get(index)
    let valMerge = _.merge(val, data)

    return this.set(index, valMerge)
  }

  clear () {
    localStorage.clear()
  }
}

export const ls = window.ls = new Locstorage()
