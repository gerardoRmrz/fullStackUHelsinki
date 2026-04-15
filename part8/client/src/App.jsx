import { useState } from "react";
import { useApolloClient, useQuery } from "@apollo/client/react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { ALL_AUTHORS, ALL_BOOKS } from "./queries/queries";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [page, setPage] = useState("authors");
  const authorsResult = useQuery(ALL_AUTHORS);
  const booksResult = useQuery(ALL_BOOKS);
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (authorsResult.loading || booksResult.loading) {
    return <div>loading...</div>;
  }

  if (!token) {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm setError={setErrorMessage} setToken={setToken} />
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        {token ? <button onClick={logout}>logout</button> : null}
      </div>

      {page === "authors" ? (
        <Authors authors={authorsResult.data.allAuthors} />
      ) : null}

      {page === "books" ? <Books books={booksResult.data.allBooks} /> : null}

      {page === "add" ? <NewBook /> : null}
    </div>
  );
};

export default App;
