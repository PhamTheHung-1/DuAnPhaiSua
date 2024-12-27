import React, { useEffect, useState } from 'react';
import { getAllBooks, deleteBook, updateBook } from '../JS/bookServices.js';
import { useNavigate } from 'react-router-dom';
import '../CSS/BookImg.css'



const BookList = () => {
  const [books, setBooks] = useState([]);

  const navigate = useNavigate();
  const handleUpdate = (bookId) => {
    // Navigate to the update page with the book's id
    navigate(`/update-book/${bookId}`);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const data = await getAllBooks();
    setBooks(data);
  };
  

  const handleDelete = async (id) => {
    await deleteBook(id);
    loadBooks(); // Refresh the list after deletion
  };
  
  return (
    <div>
      <h1>Book List</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {books.map((book) => (
          <li key={book._id} style={{ marginBottom: '20px' }}>
            <h2>{book.title}</h2>
            <p><strong>Author:</strong> {book.author}</p>
            <img 
              src={`/img/${book.image}?${new Date().getTime()}`}
              alt={book.title} 
              className='book-img'
            />
            <p><strong>Description:</strong> {book.description}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>Price:</strong> {book.price}đ</p>
            <button onClick={() => handleDelete(book._id)}>Delete</button>
            <button onClick={() => handleUpdate(book._id)}>Update</button>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default BookList;