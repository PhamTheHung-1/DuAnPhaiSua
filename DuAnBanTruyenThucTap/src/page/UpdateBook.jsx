import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleBookById, updateBook } from "../JS/bookServices.js"; // Đảm bảo đã định nghĩa getBookById trong bookServices.js

const UpdateBookForm = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const loadBook = async () => {
      const bookData = await getSingleBookById(id);
      setBook(bookData);
    };
    loadBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Gọi API cập nhật sách
    await updateBook(id, book);
    // Chuyển hướng về trang danh sách sách sau khi cập nhật
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div>
      <h2>Update Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <input
          type="text"
          name="description"
          value={book.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          type="text"
          name="genre"
          value={book.genre}
          onChange={handleChange}
          placeholder="Genre"
        />
        <input
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
          placeholder="Author"
        />
        <input
          type="number"
          name="price"
          value={book.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <input
          type="number"
          name="page"
          value={book.page}
          onChange={handleChange}
          placeholder="Page"
        />
        <input
          type="text"
          name="code"
          value={book.code}
          onChange={handleChange}
          placeholder="Code"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateBookForm;
