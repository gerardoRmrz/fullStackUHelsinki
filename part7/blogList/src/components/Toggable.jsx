import { useState } from "react";
import { Children, isValidElement, cloneElement } from "react";

import { StyledButton } from "../styles/buttonStyles";

const Toggable = (props) => {
  const [visible, setVisible] = useState(false);

  const hidenWhenVisible = {
    display: visible ? "none" : "",
    marginBottom: "30px",
  };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const childrenWithProps = Children.map(props.children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, { setVisible: setVisible, ...props });
    }
  });

  return (
    <div>
      <div style={hidenWhenVisible}>
        <StyledButton
          onClick={toggleVisibility}
          data-testid={props.buttonLabel}
          id={props.buttonLabel}
        >
          {props.buttonLabel}
        </StyledButton>
      </div>
      <div style={showWhenVisible}>
        {childrenWithProps}
        <StyledButton
          onClick={toggleVisibility}
          data-testid="cancelNewblog"
          id="cancelNewblog"
        >
          cancel
        </StyledButton>
      </div>
    </div>
  );
};

export default Toggable;
