import store from './redux/store'

const App = () => {
  

  const handleGoodClick = () =>{
    console.log('clicked GOOD')
    store.dispatch({ type: 'Good' })
  }
  const handleOkClick = () =>{
    console.log('clicked OK')
    store.dispatch({ type: 'Ok' })
  }
  const handleBadClick = () =>{
    console.log('clicked BAD')
    store.dispatch({ type: 'Bad' })
  }
  const handleResetClick = () =>{
    console.log('clicked RESET')
    store.dispatch({ type: 'Reset' })
  }
  return (
    <div>
      <div>
      <h1> Give feedback</h1>
      </div>

      <button onClick={handleGoodClick}>Good</button>
      <button onClick={handleOkClick}>Ok</button>
      <button onClick={handleBadClick}>Bad</button>
      <button onClick={handleResetClick}>Reset stats</button>

      <div>
        <p>Good: {store.getState()} </p>
        <p>Ok: {store.getState()}</p>
        <p>Bad:  {store.getState()}</p>
      </div>

    </div>
    )
  }

export default App
