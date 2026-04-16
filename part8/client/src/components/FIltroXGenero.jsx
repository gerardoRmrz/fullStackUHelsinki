const FiltroXGenero = ({ books, setFilteredBooks }) => {
  const allGenres = "all genres";
  const uniqueGenres = [
    allGenres,
    ...new Set(books.map((book) => book.genres).flat()),
  ];

  const filterGenre = () => {
    const genre = document.getElementById("genres-list").value;
    const result = books.filter((book) => {
      return book.genres.includes(genre);
    });

    if (genre == allGenres || !result) {
      setFilteredBooks(books);
      return;
    }

    setFilteredBooks(result);
  };

  return (
    <>
      <select name="genres" id="genres-list" onChange={filterGenre}>
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
