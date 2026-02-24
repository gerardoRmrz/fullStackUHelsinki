import { useSelector } from "react-redux"

const Notification = () => {

  const notification = useSelector(state => {
    console.log( 'Notification: ', state )
    return state.notification 
  } )

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  return (
  <div style={style}>
    {notification}
  </div>
  )
}

export default Notification
