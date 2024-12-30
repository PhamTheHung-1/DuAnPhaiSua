import React, { useEffect, useState } from 'react';
import { useAuth } from '../JS/auth/auth';
const Cart = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    loadCart();
  }, []);
  const { user } = useAuth();
  const loadCart = async () => {
    try {
      console.log('userID:', user.id);
      const response = await fetch(`http://localhost:5000/cart?userId=${user._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  if (!cart) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Giỏ hàng của bạn</h1>
      <ul>
        {cart.items.map((item) => (
          <li key={item.productId}>
            <img src={`/books/${item.image}`} alt={item.title} width="100" />
            <h3>{item.title}</h3>
            <p>Số lượng: {item.quantity}</p>
            <p>Giá: {item.price}đ</p>
          </li>
        ))}
      </ul>
      <h2>Tổng giá trị: {cart.totalPrice}đ</h2>
    </div>
  );
};

export default Cart;
