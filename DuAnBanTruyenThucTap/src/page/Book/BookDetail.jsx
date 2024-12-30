import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleBookById } from "../../JS/bookServices";
import { use } from "react";

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

  const addToCart = async () => {
    try {
      const response = await fetch(`http://localhost:5000/cart/${id}`, {
        method: "POST",
        headers: {
          'ConTenT-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 1,
          productId: book._id,
          quantity: 1,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{book.title}</h1>
      <img src={`/books/${book.image}`} alt={book.title} />
      <p>
        Author: <strong className="text-danger">{book.author}</strong>
      </p>
      <p>
        Genre: <strong>{book.genre}</strong>
      </p>
      <p>
        Description:
        <strong className="text-body-secondary">{book.description}</strong>
      </p>
      <p>
        Page: <strong>{book.page}</strong>
      </p>
      <p>
        Code: <strong className="text-danger">{book.code}</strong>
      </p>
      <p>
        Price: <strong>{book.price}đ</strong>
      </p>
      <button className="text-white bg-danger text-center p-1" onClick={addToCart}>
        Thêm vào giỏ hàng
      </button>
    </div>
  );
};

export default BookDetail;
