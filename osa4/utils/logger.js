//konsoliin tulostuksien moduuli
//logi viestien funktio info
const info = (...params) => {
    console.log(...params)
  }
//erroreiden funktio
  const error = (...params) => {
    console.error(...params)
  }
  
  module.exports = {
    info, error
  }