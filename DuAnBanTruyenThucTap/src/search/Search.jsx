import { useLocation } from "react-router-dom";
import {
  newBooks,
  bestSellers,
  Combo,
  Manga,
  VHVN,
  VHNN,
  WingBook,
} from "../JS/testbook";
import { BookList } from "../page/Body";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

function Search() {
  const query = useQuery();
  const searchState = query.get("query").toLocaleLowerCase();
  console.log(searchState);
  const allBooks = [
    ...newBooks,
    ...bestSellers,
    ...Combo,
    ...Manga,
    ...VHVN,
    ...VHNN,
    ...WingBook,
  ];
  const resultSearch = allBooks.filter((book) =>
    book.title.toLowerCase().includes(searchState)
  );
  console.log(resultSearch);
  return (
    <div>
      {resultSearch.length > 0 ? (
        <BookList title="Kết quả tìm kiếm." books={resultSearch} />
      ) : (
        <p>{`Không tìm thấy "${query}"`}</p>
      )}
    </div>
  );
}
export default Search;
