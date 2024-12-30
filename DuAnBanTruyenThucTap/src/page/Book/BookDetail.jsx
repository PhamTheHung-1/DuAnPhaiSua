import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleBookById } from "../../JS/bookServices";
import { useAuth } from "../../JS/auth/auth";
import clsx from "clsx";
import styles from "../../CSS/BookDetail.module.css";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    loadBookDetail();
  }, []);

  const loadBookDetail = async () => {
    const data = await getSingleBookById(id);
    setBook(data);
  };

  const { user } = useAuth();
  const addToCart = async () => {
    try {
      console.log("userID:", user.id);
      const response = await fetch(`http://localhost:5000/cart`, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          productId: book._id,
          quantity: 1,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const buyNow = () => {
    setNotificationMessage(`Mua thành công cuốn sách ${book.title} với giá ${book.price}đ`);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000); // 3 giây
  };

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
      <button className={styles.bnt_buy} onClick={buyNow}>
        Mua ngay
      </button>
      {showNotification && (
        <div className={styles.notification}>
          {notificationMessage}
          <div className={styles.progressBar}></div>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
