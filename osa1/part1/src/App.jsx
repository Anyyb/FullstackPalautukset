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
        <Button handleClick={handleGoodClick} text="Good"/>
        <Button handleClick={handleNeutralClick}text="Neutral"/> 
        <Button handleClick={handleBadClick}text="Bad"/> 
    
        {/*Näytetään painallusten tulokset*/}
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}
{/* Napin komponentti*/}
const Button =(props)=>{
  return (
<button onClick={props.handleClick}>{props.text}</button>
)
}
{/*Tilastojen renderöinnin komponentti, miten teksti renderöidään.*/}
const StatisticLine =(props)=>{
  return(
    <tbody>
      <tr>
      <td>
      {props.text}: {props.value}
      </td>
      </tr>
    </tbody>
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
 {
  if (all > 0){
    return (
      <div>
        <h1> Statistics:</h1>
        <table>
        <StatisticLine text="Good" value ={good} />
        <StatisticLine text="Neutral" value ={neutral} />
        <StatisticLine text="Bad" value ={bad} />

        <StatisticLine text="All" value ={all} />
        <StatisticLine text="Average" value ={average} />
        <StatisticLine text="Positive" value ={positive} />
        </table>
      </div>
    )
  } else {
      return (
        <div>
          <h3> No feedback given </h3>
        </div>
    )
  }
}
}
export default App