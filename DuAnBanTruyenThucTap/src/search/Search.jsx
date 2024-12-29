import { data, useLocation } from "react-router-dom";
import {
  newBooks,
  bestSellers,
  Combo,
  Manga,
  VHVN,
  VHNN,
  WingBook,
} from "../JS/testbook";
import { useState, useEffect } from "react";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

function Search() {
  const query = useQuery();
  const searchState = query.get("query").toLocaleLowerCase();
  const allBooks = [
    ...newBooks,
    ...bestSellers,
    ...Combo,
    ...Manga,
    ...VHVN,
    ...VHNN,
    ...WingBook,
  ];
  const [resultSearch, setResultSearch] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/search?query=${searchState}`);
        const data = await response.json();
        console.log(data);
        setResultSearch(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [searchState]);

  return (
    <div>
      {resultSearch.length > 0 ? (
        
        <BookList title="Kết quả tìm kiếm." books={resultSearch} />
      ) : (
        <p>{`Không tìm thấy "${data}"`}</p>
      )}
    </div>
  );
}
export default Search;
