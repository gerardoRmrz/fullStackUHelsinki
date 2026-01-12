import styled from "styled-components"

const Notification = ({ message }) =>{
  if (message?.text==='') {
    return null
  }

  return (
    <StyledDiv color={message?.color}> {message?.text} </StyledDiv>
  )

}

export default Notification

const StyledDiv = styled.div`
    color: ${props => props.color};
    background: lightgrey;
    font-size: 2.5rem;
    border-style: solid;
    border-color: ${props => props.color};
    margin: 5px;
`