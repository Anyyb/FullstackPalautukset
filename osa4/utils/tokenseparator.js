// haetaan token headerista
const tokenSeparator = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '') }
  
  //varmistetaan että token on oikea ja palautetaan dekoodattu olio jossa on tieto siitä kuka pyynnön teki
  return token = jwt.verify(tokenSeparator(request), process.env.SECRET) 
}
  next()

module.exports = {
  tokenSeparator
}