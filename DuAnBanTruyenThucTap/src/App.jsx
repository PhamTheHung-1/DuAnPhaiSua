import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import JS (bao gồm Popper)
import ProductDetail from "./productdetail/ProductDetail";
import Search from "./search/Search";
import Header from "./page/Header";
import Footer from "./page/Footer";
import Body from "./page/Body";
import React from "react";
import Cart from "./cart/Cart";
import "./CSS/Header.css";
import "./CSS/Body.css";
import "./App.css";
import "./CSS/Shop.css";
import "./CSS/LoginPage.css";
import "./CSS/RegisterPage.css";
import Bookshop from "./page/Book/Bookshop";
import Admin from "./page/Admin";
import { AuthProvider } from "./JS/auth/auth";
import ProtectedRoute from "./JS/auth/ProtectedRoute";
import { useState, useEffect } from "react";
import BookList from "./page/BookList";
import AddBookForm from "./page/AddBook";
import UpdateBookForm from "./page/UpdateBook";


function App() {
  const [cartBooks, setCartBooks] = useState([]);
  const addCart = (product)=>{
    const checkBook = cartBooks.find((item) => item.title === product.title);
    if(checkBook) {
      setCartBooks(cartBooks.map(item=>(
        item.title === product.title ? {...item, soluong: item.soluong + 1}:item
      )))
    }
    else{
      setCartBooks([...cartBooks, {...product,soluong: 1}])
    }
  }
  const removeProductCart = (productTitle) =>{
    setCartBooks(cartBooks.filter(product => product.title !== productTitle));
  }
  
  const [data, setData]=useState(null)
  useEffect(()=>{
    fetch('http://localhost:5000/')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

  })

  const handleBookAdded = (newBook) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };


  return (
    <AuthProvider>
      {" "}
      {/* Wrap entire app */}
      <div className="App">
        <Header lengthCart={cartBooks.length}/>
        <Routes>
          <Route exact path="/" element={<Body addCart = {addCart}/>} />
          <Route path="/" element={<Body addCart = {addCart}/>} />
          <Route path="/shop" element={<Bookshop />} />
          <Route path="/product/:id" element={<ProductDetail addCart = {addCart}/>} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart cartsBook = {cartBooks} removeProductCart={removeProductCart}/>}/>
          <Route path="/books" element={<BookList/>}/>
          <Route path="/addbook" onBookAdded={handleBookAdded} element={<AddBookForm/>}/>
          <Route path="/update-book/:id" element={<UpdateBookForm/>}/>
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
