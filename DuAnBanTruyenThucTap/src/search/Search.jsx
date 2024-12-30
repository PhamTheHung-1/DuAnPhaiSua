import { data, useLocation } from "react-router-dom";
import clsx from "clsx";
import styles from "../CSS/Search.module.css";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate(); // Hook điều hướng
  // Hàm điều hướng đến chi tiết truyện
  const handleDetail = (id) => {
    navigate(`/book-detail/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/search?query=${searchState}`
        );
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
        resultSearch.map((book, index) => (
          <div className={clsx(styles.container_search)} key={index}>
            <div>
              <img
                src={`/books/${book.image}?${new Date().getTime()}`}
                alt=""
                style={{ cursor: "pointer" }} // Thêm con trỏ chỉ tay
                onClick={() => handleDetail(book._id)} // Thêm sự kiện click
              />
              <p className={clsx(styles.title_cart)}>{book.title}</p>
              <p className={clsx(styles.price_cart)}>Price: {book.price}đ</p>
            </div>
          </div>
        ))
      ) : (
        <p>{`Không tìm thấy "${data}"`}</p>
      )}
    </div>
  );
}

export default Search;
