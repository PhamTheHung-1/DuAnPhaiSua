import React from "react";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const { price } = location.price || {}; 
  console.log("Price:", price);
  return (
    <div>
      <h1>Trang thanh toán</h1>
      {bookId ? (
        <p>Đang thanh toán cho sách có ID: {bookId}</p>
      ) : (
        <p>Không có sản phẩm để thanh toán.</p>
      )}
      {/* Thêm các thông tin thanh toán ở đây */}
    </div>
  );
};

export default Checkout;
