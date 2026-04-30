import BirthYear from "./BirthYear";

const Authors = (props) => {
  const authors = props.authors;
  //console.log(authors);
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>book count</th>
          </tr>
          {authors.map((a, index) => (
            <tr key={index}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BirthYear authors={authors} />
    </div>
  );
};

export default Authors;
