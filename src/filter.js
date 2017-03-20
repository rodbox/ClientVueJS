import Vue from 'vue'
import moment from 'moment'

let translate = (value, countPlur) => {
  if (window.store.state.localeModule.trans[value] !== undefined) {
    if (countPlur !== undefined) {
      if (countPlur > 1) {
        return window.store.state.localeModule.trans[value][1]
      }
      return window.store.state.localeModule.trans[value][0]
    }
    return window.store.state.localeModule.trans[value]
  } else {
    return value
  }
}

let currencyConvert = (value, currencyOrig, currencyConv) => {
  if (currencyOrig !== currencyConv) {
    let txConv = window.store.state.currencys.list[currencyOrig]['tx'][currencyConv]
    let priceConv = parseFloat(value * parseFloat(txConv))
    return Math.ceil(priceConv) - 0.01
  } else {
    return value
  }
}

Vue.filter('size', (sizeValue) => {
  let value = parseInt(sizeValue)
  let val = ''
  let unit = ''

  if (value < 1048576) {
    val = value / 1024
    unit = 'Kb'
  } else if (value < 1073741824) {
    val = value / 1048576
    unit = 'Mb'
  } else if (value < 1099511627776) {
    val = value / 1073741824
    unit = 'Gb'
  } else {
    val = value / 1099511627776
    unit = 'Tb'
  }

  return val.toFixed(2) + unit
})

Vue.filter('trans', (value, countPlur) => {
  return translate(value, countPlur)
})

Vue.filter('limit', (value, limit) => {
  if (value !== undefined && value.length > (limit - 3)) {
    value = value.substring(0, limit) + '...'
  }
  return value
})

Vue.filter('moment', (value, config) => {
  if (value === null || value === false) {
    return '-'
  }
  return moment(value * 1000).format(config)
})

Vue.filter('isNew', (value) => {
  let a = moment(value * 1000)
  let b = moment()
  let dif = a.diff(b, 'minutes') //, 1

  if (dif > -30) {
    return 'new'
  }
})

Vue.filter('fromNow', (value, bool) => {
  if (value === null || value === false) {
    return '-'
  }
  let date = (bool) ? value * 1000 : value
  let dateMoment = moment(date)

  if (dateMoment._isValid) {
    return dateMoment.from()
  }
})

Vue.filter('age', (value, bool) => {
  if (value === null || value === false) {
    return '-'
  }
  let date = (bool) ? value * 1000 : value
  let datenow = moment()
  let dateMoment = moment(date)

  if (dateMoment._isValid) {
    return datenow.diff(dateMoment, 'year')
  }
})

Vue.filter('default', (value, defaultValue) => {
  return (value === null || value === undefined) ? defaultValue : value
})

Vue.filter('length', (value) => {
  return value.length
})

Vue.filter('basename', (value) => {
  return value.split('/').reverse()[0]
})

Vue.filter('singular', (value) => {
  return value.replace(new RegExp('s$'), '')
})

Vue.filter('currencyConvert', (value, currencyOrig) => {
  return currencyConvert(value, '€', window.store.state.currency)
})

Vue.filter('extension', (value) => {
  return value.split('.').reverse()[0]
})

export default translate
