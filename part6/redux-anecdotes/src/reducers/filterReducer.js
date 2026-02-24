
export const setFilter = (filter) => {

  if (filter === ''){
    return {
      type: 'ALL'
    }
  }

  return {
    type: 'SET_FILTER',
    payload: filter
  }
}


const filterReducer = (state = 'ALL', action) => {
  
  switch (action.type){
    case 'SET_FILTER':{
      return action.payload
    }
    case 'ALL':{
      return 'ALL'
    }
    default:{
      return state
    }
  }
}

export default filterReducer