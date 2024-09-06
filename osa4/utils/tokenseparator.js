const jwt = require('jsonwebtoken')
// haetaan token headerista
const tokenSeparator = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '') 
  } else {
  request.token= null
}
next()
}
module.exports = {
  tokenSeparator
}