import styled from "styled-components";
import { useSelector } from "react-redux";

const Notification = () => {
  const message = useSelector((state) => state.notifications);
  if (message?.text === "") {
    return null;
  }

  return (
    <>
      {message ? (
        <StyledDiv color={message?.color} data-testid="result-message">
          {" "}
          {message?.text}{" "}
        </StyledDiv>
      ) : null}
    </>
  );
};

export default Notification;

const StyledDiv = styled.div`
  color: ${(props) => props.color};
  background: lightgrey;
  font-size: 2.5rem;
  border-style: solid;
  border-color: ${(props) => props.color};
  margin: 5px;
`;
