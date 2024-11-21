const initialState = {
    good:0,
    ok:0,
    bad:0,
  }
  
  const counterReducer = (state = initialState, action) => {
    switch (action.type){
      case'Good':
      return state.good + 1 
      case 'Ok':
        return state.ok + 1 
      case 'Bad':
        return state.bad + 1
      case 'Reset':
        return state
    }
  }
export default counterReducer  