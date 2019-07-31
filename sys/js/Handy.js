'use strict'

const SHORTPROP_2_REALPROP = {
    'x': 'left'
  , 'y': 'top'
  , 'w': 'width'
  , 'h': 'height'
  , 'r': 'transform'
}
const SHORTPROP_2_REALDEFPROP = {
    'x': 'left:${valStr}px;'
  , 'y': 'top:${valStr}px;'
  , 'w': 'width:${valStr}px;'
  , 'h': 'height:${valStr}px;'
  , 'r': 'transform:rotate(${valStr}deg)'
}
// Transforme 'x=12 r=24' en  {left:12, transform:"rotate(24deg)"}
function strToHashProps(str){
  var h = {}
  for( var paire of props.split(' ')){
    var [prop, valStr] = paire.split('=')
    var realProp = SHORTPROP_2_REALPROP[prop]
      , realVal
    switch (prop) {
      case 'x':
      case 'y':
      case 'w':
      case 'h':
        realVal = parseInt(valStr,10)
        break
      case 'r':
        realVal = `rotate(${valStr}deg)`
        break
      default:
        realVal = valStr
    }
    Object.assign(h, {[realProp]: realVal})
  }
  return h
}
function strToStyleProps(str){
  var h = []
  for( var paire of props.split(' ')){
    var [prop, valStr] = paire.split('=')
    h.push(eval(SHORTPROP_2_REALDEFPROP[prop]))
  }
  return h.join('')
}

// Reçoit 'x=12 r=24' et retourne {x: 12, r: 24}
function strToHash(str){
  var h = {}
  for( var paire of props.split(' ')){
    var [prop, valStr] = paire.split('=')
    var realVal
    switch (prop) {
      case 'x':
      case 'y':
      case 'w':
      case 'h':
        realVal = parseInt(valStr,10)
        break
      case 'r':
        realVal = parseFloat(valStr)
      default:
        realVal = valStr
    }
    Object.assign(h, {[prop]: realVal})
  }
  return h
}

function stopEvent(e){
  e.stopPropagation()
  e.preventDefault()
  return false
}

function raise(msg, inConsole){
  inConsole && console.error(msg)
  throw Error(msg)
}
