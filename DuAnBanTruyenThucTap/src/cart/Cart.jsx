import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import styles from "../CSS/Cart.module.css";

function Cart({ cartsBook, removeProductCart }) {
  console.log(cartsBook);
  return (
    <div>
      {cartsBook.length === 0 ? (
        <h2>Giỏ hàng trống</h2>
      ) : (
        cartsBook.map((book, index) => (
          <React.Fragment>
            <div className={styles.list_book_cart} key={index}>
              <Link to={`/product/${book.title}`} className={styles.container}>
                <div className={clsx(styles.img_cart)}>
                  <img src={`/public/img/${book.img}`} alt={book.title} />
                </div>
                <div className={clsx(styles.content_bookcart)}>
                  <h3>{book.title}</h3>
                  <p>
                    Tác giả: <b style={{ color: "red" }}>{book.TacGia}</b>
                  </p>
                  <p>Giá: {book.price} VND</p>
                </div>
              </Link>
              <button
                className={styles.bnt_cart}
                onClick={() => removeProductCart(book.title)}
              >
                Xóa
              </button>
            </div>
            <hr />
          </React.Fragment>
        ))
      )}
    </div>
  );
}

export default Cart;
