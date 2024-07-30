const dummy = (blogs) => {
    return 1
  }
const totalLikes=(blogs) =>{
  // reduce metodi käy läpi blogs taulukon ja laskee alkioiden likes arvojen summan. 
  // Summa saa alkuarvoksi 0 ja siihen lisätään aina listan seuraavan alkion likesin arvo.
  const sum = blogs.reduce((accumulator, currentValue) => accumulator + currentValue.likes, 0,)
  return sum
}
const favoriteBlog=(blogs) =>{
  // käydään taulukko läpi reduce metodilla ja tarkistetaan onko currentValue eli 
  // listan seuraavan alkion arvo aina suurempi, kuin arvot joita aiemmin on saatu.
  const mostLikes = blogs.reduce((accumulator, currentValue) =>
    // ehto, jos verrattavan alkion currentValue.likes määrä on suurempi,
   // kuin aiemmin saatu arvo se tallennetaan muuttujaan accumulator ja palautetaan.
  // jos ei niin palautetaan accumulatorin arvo eli nykyinen suurin arvo.
    (currentValue.likes > accumulator.likes ? currentValue : accumulator),blogs[0])
  return mostLikes
}
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }