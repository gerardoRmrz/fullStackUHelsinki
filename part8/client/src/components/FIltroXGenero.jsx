import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client/react";
import { FILTER_BY_GENRE } from "../queries/queries";

const FiltroXGenero = ({ books, setFilteredBooks }) => {
  const [filterByGenre, filterByGenreresult] = useLazyQuery(FILTER_BY_GENRE);
  const uniqueGenres = [
    "all genres",
    ...new Set(books.map((book) => book.genres).flat()),
  ];

  /* const filterGenre = () => {
    const genre = document.getElementById("genres-list").value;
    const result = books.filter((book) => {
      return book.genres.includes(genre);
    });

    if (genre == allGenres || !result) {
      setFilteredBooks(books);
      return;
    }

    setFilteredBooks(result);
  }; */

  useEffect(() => {
    if (filterByGenreresult.data) {
      setFilteredBooks(filterByGenreresult.data.filterByGenre);
    }
  }, [filterByGenreresult.data]);

  const filterGenreGraphQl = () => {
    const chosenGenre = document.getElementById("genres-list").value;
    if (chosenGenre === "all genres") {
      setFilteredBooks(books);
    } else {
      filterByGenre({
        variables: { genre: chosenGenre },
      });
    }
  };

  return (
    <>
      <h3>Filter by genre</h3>
      <select name="genres" id="genres-list" onChange={filterGenreGraphQl}>
        {uniqueGenres.map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </>
  );
};

export default FiltroXGenero;
