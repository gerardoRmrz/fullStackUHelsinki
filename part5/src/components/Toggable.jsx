import { useState } from "react";
import styled from "styled-components";

const Toggable = (props) => {
  const [visible, setVisible] = useState(false)

  const hidenWhenVisible = {display: visible ? 'none' : ''}
  const showWhenVisible = {display: visible ? '': 'none'}

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hidenWhenVisible}>
        <StyledButton onClick={toggleVisibility}>{props.buttonLabel}</StyledButton>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <StyledButton onClick={toggleVisibility}>cancel</StyledButton>
      </div>
    </div>
  )

}

export default Toggable

const StyledButton = styled.button`
  font-size: 1.5rem;
`