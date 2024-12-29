import React, { useState } from "react";
import axios from "axios";

const AddBookForm = () => {
  const [formData, setFormData] = useState({
    image: null, // Thêm image vào formData để lưu trữ ảnh
    title: "",
    description: "",
    genre: "",
    author: "",
    price: "",
    page: "",
    code: "",
  });

  const [preview, setPreview] = useState(null); // Thêm trạng thái preview để hiển thị ảnh xem trước

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file, // Lưu ảnh vào formData
    }));
    setPreview(URL.createObjectURL(file)); // Tạo đường dẫn ảnh xem trước
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("image", formData.image);
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("genre", formData.genre);
    data.append("author", formData.author);
    data.append("price", formData.price);
    data.append("page", formData.page);
    data.append("code", formData.code);

    try {
      const response = await axios.post(
        "http://localhost:5000/add-book",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Book added successfully: " + response.data.message);
    } catch (error) {
      console.error("Error adding book:", error.response.data);
      alert("Failed to add book.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Image:</label>
        <input type="file" name="image" onChange={handleImageChange} required />
      </div>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        <label>Genre:</label>
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Author:</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          step="0.01"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Page:</label>
        <input
          type="number"
          name="page"
          value={formData.page}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Code:</label>
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
        />
      </div>

      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{ width: "192px", height: "301px", marginTop: "10px" }}
        />
      )}
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBookForm;
