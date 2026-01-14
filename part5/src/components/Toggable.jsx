import { useState } from 'react'
import styled from 'styled-components'
import { Children, isValidElement, cloneElement } from 'react'

const Toggable = (props) => {
  const [visible, setVisible] = useState(false)

  const hidenWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '': 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const childrenWithProps = Children.map( props.children, child => {
    if (isValidElement(child)) {
      return cloneElement(child, { setVisible: setVisible, ...props })
    }
  } )

  return (
    <div>
      <div style={hidenWhenVisible}>
        <StyledButton onClick={toggleVisibility}>{props.buttonLabel}</StyledButton>
      </div>
      <div style={showWhenVisible}>
        {childrenWithProps}
        <StyledButton onClick={toggleVisibility}>cancel</StyledButton>
      </div>
    </div>
  )

}

export default Toggable

const StyledButton = styled.button`
  font-size: 1.5rem;
  &:hover {
    background-color: darkgray;
  }
  &:active {
    background-color: #004085;
    color:white;
    transform: translateY(1px);
  }
`