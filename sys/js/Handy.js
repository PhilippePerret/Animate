'use strict'

function stopEvent(e){
  e.stopPropagation()
  e.preventDefault()
  return false
}

function raise(msg, inConsole){
  inConsole && console.error(msg)
  throw Error(msg)
}
