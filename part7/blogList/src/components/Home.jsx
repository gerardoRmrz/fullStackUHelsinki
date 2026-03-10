import { StyledH1 } from "../styles/headersStyles";

const Home = ({ user }) => {
  return (
    <div>
      {" "}
      {user ? (
        <StyledH1>WELCOME {user.name}!!</StyledH1>
      ) : (
        <StyledH1>PLEASE LOGIN</StyledH1>
      )}{" "}
    </div>
  );
};

export default Home;
