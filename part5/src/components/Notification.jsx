

const Notification = ({ message }) =>{
  if (message?.text==='') {
    return null
  }
 
  const messageStyle = {
    color: message?.color,
    background: 'lightgrey',
    fontSize: '2.5rem',
    borderStyle: 'solid'
  }

  return (
    <div style={messageStyle}> {message?.text} </div>
  )

}

export default Notification