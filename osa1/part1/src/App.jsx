import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
 
  
  {/*Käsitellään nappien painallukset*/}
  const handleGoodClick = () =>{
    console.log('clicked GOOD')
    setGood(good+1)
  }
  const handleNeutralClick = () =>{
    console.log('clicked NEUTRAL')
    setNeutral(neutral+1)
  }
  const handleBadClick = () =>{
    console.log('clicked BAD')
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
        
        {/*Näytetään painallusten tulokset*/}
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}

{/*Tilastojen komponentti*/}
const Statistics = (props) =>{
{/*Asetetaan palautteille arvot*/}
  const goodValue = 1;
  const neutralValue = 0;
  const badValue = -1;

{/*Asetetaan palautteille propsit, jotta voidaan määrittää ja renderöidä oikein*/}
  const good = props.good;
  const neutral = props.neutral;
  const bad = props.bad;

{/*laskukaavat kaikkien arvojen summa, kaikkien arvostelujen yhteismäärä, 
keskiarvo ja positiivisten prosentti osuus.*/}

  const valuesSum = good * goodValue + neutral * neutralValue + bad * badValue;
  const all = good + neutral + bad;
  const average = valuesSum / all;
  const positive = (good / all) * 100;

  return (
  <div>
    <h1> Statistics:</h1>
    <h3> Good: {good}</h3>
    <h3> Neutral: {neutral}</h3>
    <h3> Bad: {bad}</h3>
    <h3> All: {all}</h3>
    <h3> Average: {average}</h3>
    <h3> Positive: {positive}%</h3>
  </div>
  )
}

export default App