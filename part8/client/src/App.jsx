import { useEffect, useState } from "react";
import {
  useApolloClient,
  useQuery,
  useLazyQuery,
  useSubscription,
} from "@apollo/client/react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Recommend from "./components/Recommend";

import {
  ALL_AUTHORS,
  ALL_BOOKS,
  RECOMMENDED,
  CURRENT_USER,
  BOOK_ADDED,
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

  const [getBooksByGenre, booksByGenreData] = useLazyQuery(RECOMMENDED);
  const [getCurrentUser, resultCurrentUser] = useLazyQuery(CURRENT_USER);

  const client = useApolloClient();

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => {
      return set.map((p) => p.id).includes(object.id);
    };
    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      window.alert(
        `Se ha agregado el libro: ${data.data.bookAdded.title} to the list`,
      );
      updateCacheWith(addedBook);
    },
  });

  useEffect(() => {
    getCurrentUser();
    setCurrentUser(resultCurrentUser.data);
    getBooksByGenre();
  }, [token]);

  useEffect(() => {
    getCurrentUser();
    if (token && booksByGenreData.data) {
      setBooksByGenre(booksByGenreData.data.recommendedBooks);
    } else {
      console.log("========================");
    }
  }, [booksByGenreData]);

  const logout = () => {
    setPage("authors");
    client.resetStore();
    localStorage.removeItem("token");
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

      {page === "books" && booksResult.data ? (
        <Books books={booksResult.data.allBooks} />
      ) : null}

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
