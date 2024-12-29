import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleBookById } from "../../JS/bookServices";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    loadBookDetail();
  }, []);

  const loadBookDetail = async () => {
    const data = await getSingleBookById(id);
    setBook(data);
  };

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{book.title}</h1>
      <img src={`/books/${book.image}`} alt={book.title} />
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Genre:</strong> {book.genre}
      </p>
      <p>
        <strong>Description:</strong> {book.description}
      </p>
      <p>
        <strong>Page:</strong> {book.page}
      </p>
      <p>
        <strong>Code:</strong> {book.code}
      </p>
      <p>
        <strong>Price:</strong> {book.price}đ
      </p>
    </div>
  );
};

export default BookDetail;
