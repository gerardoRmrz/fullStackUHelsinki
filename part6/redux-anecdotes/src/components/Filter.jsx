import { setFilter } from "../reducers/filterReducer"
import { useDispatch } from 'react-redux'

const Filter = () => {

  const style = { 'marginBottom': '20px' }

  const dispatch = useDispatch()
  const handleChange = (event) =>{
    dispatch( setFilter(event.target.value) )
  }


  return (
    <>
      filter <input type='search' style={style}
      onChange={(event)=> handleChange(event) }>
      </input>
    </>
  )
}

export default Filter