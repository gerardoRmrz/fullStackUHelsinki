import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useQuery } from "@apollo/client/react";
import { ALL_AUTHORS, ALL_BOOKS } from "./queries/queries";

const App = () => {
  const [page, setPage] = useState("authors");

  const authorsResult = useQuery(ALL_AUTHORS);
  const booksResult = useQuery(ALL_BOOKS);

  if (authorsResult.loading || booksResult.loading) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
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
