import { useState } from "react";
import FiltroXGenero from "./FIltroXGenero";

const Books = (props) => {
  const books = props.books;
  const [filteredBooks, setFilteredBooks] = useState(books);

  return (
    <div>
      <FiltroXGenero books={books} setFilteredBooks={setFilteredBooks} />
      <h2>Books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a, index) => (
            <tr key={index}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
