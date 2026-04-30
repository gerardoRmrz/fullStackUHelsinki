import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { SET_BIRTHYEAR, ALL_AUTHORS, ALL_BOOKS } from "../queries/queries";

const BirthYear = ({ authors }) => {
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");

  const [setBirthYear] = useMutation(SET_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const errors = error.errors[0];
      const message = errors.message;
      console.log(message);
    },
  });

  const submit = (event) => {
    event.preventDefault();
    setBirthYear({ variables: { name: author, setBorn: year } });

    setAuthor("");
    setYear("");
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <label>
            name
            <select
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            >
              {authors.map((a, index) => (
                <option value={a.name} key={index}>
                  {a.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          born{" "}
          <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(Number(target.value))}
          ></input>
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default BirthYear;
