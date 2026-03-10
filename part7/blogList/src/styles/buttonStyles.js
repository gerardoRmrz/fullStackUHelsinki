import styled from "styled-components";

export const StyledButton = styled.button`
  font-size: 1.5rem;
  border-radius: 5px;
  &:hover {
    background-color: darkgray;
  }
  &:active {
    background-color: #004085; /* Even darker when clicked */
    transform: translateY(1px); /* Simple press effect */
  }
`;
