import React, { useEffect, useState } from "react";
import { getAllBooks } from "../../JS/bookServices";
import { useNavigate } from "react-router-dom";

const xemsach = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const data = await getAllBooks();
    const allowedCategories = [
      "Manga ",
      "Truyện tranh",
      "Cổ tích",
      "Wing Books",
    ];
    const filteredBooks = data.filter((book) =>
      allowedCategories.includes(book.genre)
    );
    setBooks(filteredBooks);
  };

  const handleDetail = (id) => {
    navigate(`/book-detail/${id}`);
  };

  return (
    <div>
      <h2 className="text-center text-danger">Danh sách truyện</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          padding: "20px",
        }}
      >
        {books.map((book) => (
          <div
            key={book._id}
            style={{
              textAlign: "center",
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <img
              src={`/books/${book.image}?${new Date().getTime()}`}
              alt={book.title}
              className="book-img"
              style={{
                width: "191px",
                height: "301px",
                cursor: "pointer",
              }}
              onClick={() => handleDetail(book._id)}
            />
            <p
              className="text-center text-secondary-emphasis"
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                margin: "10px 0",
              }}
              onClick={() => handleDetail(book._id)}
            >
              {book.title}
            </p>
            <p>
              <strong>Price:</strong> {book.price}đ
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default xemsach;
