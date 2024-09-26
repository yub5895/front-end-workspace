import { getFetchThen, getAwait } from "./api/movie";
import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]);

  const loadFetchThen = () => {
    getFetchThen().then((result) => {
      setData(result);
    });
  };

  const loadAwait = async () => {
    const result = await getAwait();
    setData(result);
  };

  useEffect(() => {
    // loadFetchThen();
    loadAwait();
  }, []);
  return (
    <>
      {data.map((movie) => (
        <div key={movie.id}>
          <h1>{movie.title}</h1>
          <h2>{movie.genre}</h2>
          <h3>{movie.actor}</h3>
        </div>
      ))}
    </>
  );
};
export default App;