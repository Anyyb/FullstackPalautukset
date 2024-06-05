import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  {/*Jos haluan tallentaa kaikki klikkaukset tilaan statistics
  const [clicks, setStatistics] = useState([])*/}

  {/*Käsitellään nappien painallukset*/}
  
  const handleGoodClick = () =>{
    console.log('clicked GOOD')
    {/*setStatistics(clicks.concat('Good:'))*/}
    setGood(good+1)
  }
  const handleNeutralClick = () =>{
    console.log('clicked NEUTRAL')
    {/*setStatistics(clicks.concat('Neutral:'))*/}
    setNeutral(neutral+1)
  }
  const handleBadClick = () =>{
    console.log('clicked BAD')
    {/*setStatistics(clicks.concat('Bad:'))*/}
    setBad(bad+1)
  }

  return (
    <div>
      <div>
        <h1> Give feedback</h1>
        {/*tehdään buttonit ja asetetaan niihin tapahtumankäsittelijät*/}
        <button onClick={handleGoodClick}>Good</button>
        <button onClick={handleNeutralClick}>Neutral</button> 
        <button onClick={handleBadClick}>Bad</button> 
        {/* <button onClick ={()=> setGood(good+1)}> Good </button>
        <button onClick ={()=> setNeutral(neutral+1)}> Neutral </button>
        <button onClick ={()=> setBad(bad+1)}> Bad </button>*/}
        
        {/*Näytetään painallusten tulokset*/}
        <h1> Statistics: </h1>
        <h3> Good: {good} </h3>
        <h3> Neutral: {neutral} </h3>
        <h3> Bad: {bad} </h3>
      </div>
    </div>
  )
}

export default App