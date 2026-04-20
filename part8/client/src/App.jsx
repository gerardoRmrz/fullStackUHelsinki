import { useEffect, useState } from "react";
import { useApolloClient, useQuery, useLazyQuery } from "@apollo/client/react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Recommend from "./components/Recommend";

import {
  ALL_AUTHORS,
  ALL_BOOKS,
  BOOKS_BY_GENRE,
  CURRENT_USER,
} from "./queries/queries";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("secret");
  const [currentUser, setCurrentUser] = useState(null);
  const [page, setPage] = useState("authors");
  const [booksByGenre, setBooksByGenre] = useState(null);
  const [favGenre, setFavGenre] = useState(null);

  const authorsResult = useQuery(ALL_AUTHORS);
  const booksResult = useQuery(ALL_BOOKS);
  const [getBooksByGenre, booksByGenreData] = useLazyQuery(BOOKS_BY_GENRE);

  const [getCurrentUser, { calledUserQ, loadedUserQ, resultCurrentUser }] =
    useLazyQuery(CURRENT_USER);

  const client = useApolloClient();

  useEffect(() => {
    if (token && booksByGenreData.data) {
      setBooksByGenre(booksByGenreData.data.recommendedBooks);
      setCurrentUser(resultCurrentUser);
    } else {
      console.log("========================");
    }
  }, [booksByGenreData]);

  const logout = () => {
    localStorage.removeItem("token");
    setPage("authors");
    client.resetStore();
    setToken(null);
    localStorage.clear();
  };

  const setFavoriteGenre = () => {
    getBooksByGenre();
    getCurrentUser();
    setPage("recommend");
  };

  if (authorsResult.loading || booksResult.loading) {
    return <div>loading...</div>;
  }

  if (!token) {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm
          setError={setErrorMessage}
          setToken={setToken}
          username={username}
          setUserName={setUserName}
          password={password}
        />
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setFavoriteGenre()}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>

      {page === "authors" ? (
        <Authors authors={authorsResult.data.allAuthors} />
      ) : null}

      {page === "books" ? <Books books={booksResult.data.allBooks} /> : null}

      {page === "add" ? <NewBook /> : null}

      {page === "recommend" && token && booksByGenreData.data ? (
        <Recommend
          bList={booksByGenreData.data.recommendedBooks}
          favoriteGenre={favGenre}
        />
      ) : null}
    </div>
  );
};

export default App;
