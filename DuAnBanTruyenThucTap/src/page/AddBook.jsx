import React, { useState } from 'react';
import { addNewBook } from '../JS/bookServices.js';

const AddBookForm = () => {
  const [book, setBook] = useState({
    title: '',
    description: '',
    genre: '',
    author: '',
    price: '',
    page: '',
    code: '',
  });
  const [file, setFile] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSuccess(false);
    setIsError(false);
    
    try {
      const response = await addNewBook(book, file);
      console.log('Book added successfully:', response);
      setIsSuccess(true);
      // Reset the form after success
      setBook({
        title: '',
        description: '',
        genre: '',
        author: '',
        price: '',
        page: '',
        code: '',
      });
      setFile(null); // Clear the file input
    } catch (error) {
      console.error('Error adding book:', error);
      setIsError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={book.title}
        onChange={handleInputChange}
        placeholder="Title"
        required
      />
      <input
        type="text"
        name="description"
        value={book.description}
        onChange={handleInputChange}
        placeholder="Description"
        required
      />
      <input
        type="text"
        name="genre"
        value={book.genre}
        onChange={handleInputChange}
        placeholder="Genre"
        required
      />
      <input
        type="text"
        name="author"
        value={book.author}
        onChange={handleInputChange}
        placeholder="Author"
        required
      />
      <input
        type="number"
        name="price"
        value={book.price}
        onChange={handleInputChange}
        placeholder="Price"
        required
      />
      <input
        type="number"
        name="page"
        value={book.page}
        onChange={handleInputChange}
        placeholder="Page"
        required
      />
      <input
        type="text"
        name="code"
        value={book.code}
        onChange={handleInputChange}
        placeholder="Code"
        required
      />
      <input type="file" onChange={handleFileChange} required />
      <button type="submit">Add Book</button>

      {isSuccess && <p>Book added successfully!</p>}
      {isError && <p>Error adding book. Please try again.</p>}
    </form>
  );
};

export default AddBookForm;
