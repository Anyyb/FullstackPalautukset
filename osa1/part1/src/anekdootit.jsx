import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const[votes,setVotes] = useState([0,0,0,0,0,0,0,0])
  

{/*Käsitellään nappien painallukset*/}
  const randomAnecdote = () =>{
  {/*Haetaan satunnainen anekdootti */}
   const randomIndex = Math.floor(Math.random() * anecdotes.length);
   setSelected(randomIndex)
  }
  
  const handleVotes=()=>{
    const copy = { ...votes }
    {/*kasvatetaan valitun anekdotin arvoa yhdellä */}
    copy[selected] += 1
    setVotes(copy)
    setSelected(selected)
  }

  const MostVotes=()=>{
    {/*asetetaan Votes objektin saamat äänet taulukkoon */}
    const arr = Object.values(votes);
    {/*etsitään taulukosta suurin arvo */}
    const most = Math.max(...arr);
    {/*etsitään suurimman arvon saanneen indeksi */}
    const index = arr.indexOf(most)
    {/*asetetaan anekdootille kyseinen indeksi*/}
    const anecdote= anecdotes[index]
    console.log(anecdote)
    {/*palautetaan suurimmalla arvolla ja indeksillä oleva anekdotti */}
    return anecdote
  }

  return (
    <div>
       
      {/*Näytetään painallusten tulokset*/}
        <h3> Anecdote of the day: </h3>
        <h3> Anecdote: {anecdotes[selected]} </h3>
        <h4> Votes: {votes[selected]}</h4>
        
      {/*tehdään buttonit ja asetetaan niihin tapahtumankäsittelijät*/}
        <Button handleClick={handleVotes} text="vote"/>
        <Button handleClick={randomAnecdote} text="next anecdote"/>
        
        <h3> Anecdote with most votes:{MostVotes()}</h3>
    </div>
  )
}
{/* Napin komponentti*/}
const Button =(props)=>{
    return (
  <button onClick={props.handleClick}>{props.text}</button>
  )
  }


export default App