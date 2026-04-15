import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../queries/queries";

const LoginForm = ({ setError, setToken }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("secret");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("phonenumbers-user-token", token);
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
