const Recommend = ({ bList, favoriteGenre }) => {
  const booksList = (bList) => {
    if (!bList || !Array.isArray(bList) || bList.length === 0) {
      return <h2>No {favoriteGenre} Books Founded</h2>;
    }
    return (
      <>
        <h2>Books</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {bList.map((a, index) => (
              <tr key={index}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };
  return <>{booksList(bList)}</>;
};

export default Recommend;
