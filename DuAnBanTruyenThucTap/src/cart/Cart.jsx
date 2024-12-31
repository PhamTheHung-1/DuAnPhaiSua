import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from '../CSS/Cart.module.css';
import { useAuth } from '../JS/auth/auth';
const Cart = () => {
  const [cart, setCart] = useState(null);
  const [notification, setNotification] = useState(false);
  useEffect(() => {
    loadCart();
  }, []);
  const { user } = useAuth();
  const loadCart = async () => {
    try {
      console.log('userID:', user.id);
      const response = await fetch(`http://localhost:5000/cart?userId=${user.id}`, {
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
  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      const response = await fetch(`http://localhost:5000/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id, productId, quantity }),
        
      });
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };
  const removeItem = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/cart`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id, productId }),
      });
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  }
  const handleCheckout = async () => {
    setNotification(true);
    setTimeout(() => {
      setNotification(false);
    }, 3000);
  }
  if (!cart) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Giỏ hàng của bạn</h1>
      <ul>
        {cart.items.map((item) => (
          <li className={clsx(styles.container_product)}  key={item.productId}>
            <div >
              <img src={`/books/${item.image}`} alt={item.title} width="100" />
            </div>
            <div className={clsx(styles.contentProduct_cart)}>
              <h3>{item.title}</h3>
              <p>Số lượng:
                <button className={clsx(styles.btn_quatity)} onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button> 
                <span className={clsx(styles.quantity)}>
                {item.quantity}
                </span>
                <button className={clsx(styles.btn_quatity)} onClick={() => updateQuantity(item.productId, item.quantity - 1)}>-</button> 
                </p>
              <p>Giá: {item.price}đ</p>
              <button className={clsx(styles.btn_remove)} onClick={() => removeItem(item.productId)}>Xóa</button>
            </div>
          </li>
        ))}
      </ul>
      <div className={clsx(styles.container_buy)}>
        <h2>Tổng giá trị: {cart.totalPrice}đ</h2>
        <button className={clsx(styles.btn_buy)} onClick={handleCheckout}>Thanh toán</button>
      </div>
      {notification && ( 
        <div className={clsx(styles.notification)}> 
          <p>Thanh toán thành công!</p> 
          <div className={clsx(styles.progressBar)}></div> 
        </div> 
      )}
    </div>
  );
};

export default Cart;
