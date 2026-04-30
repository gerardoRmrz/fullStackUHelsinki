import { useEffect } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../queries/queries";

const LoginForm = ({ setError, setToken, username, setUserName, password }) => {
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const tokenData = result.data.login.value;
      setToken(tokenData);
      localStorage.setItem("books-user-token", tokenData);
    }
  }, [result.data]);

  const submit = (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };

  return (
    <>
      <form onSubmit={submit}>
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUserName(target.value)}
        ></input>
        <button type="submit" onClick={submit}>
          login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
