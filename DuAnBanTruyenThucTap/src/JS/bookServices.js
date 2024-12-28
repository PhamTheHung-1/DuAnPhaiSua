import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Fetch all books
export const getAllBooks = async () => {
  const response = await axios.get(`${API_URL}/books`);
  return response.data;
};

// Fetch a single book by ID
export const getSingleBookById = async (id) => {
  const response = await axios.get(`${API_URL}/books/${id}`);
  return response.data;
};

// Add a new book
/*export const addNewBook = async (book, file) => {
  try {
    const formData = new FormData();
    formData.append('title', book.title);
    formData.append('description', book.description);
    formData.append('genre', book.genre);
    formData.append('author', book.author);
    formData.append('price', Number(book.price)); // Chuyển sang số
    formData.append('page', Number(book.page));   // Chuyển sang số
    formData.append('code', book.code);
    formData.append('file', file); // Gửi file ảnh

    const response = await axios.post(`${API_URL}/books`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data; // Returning the response for handling in the component
  } catch (error) {
    console.error('Error adding book:', error);
    if (error.response && error.response.status === 400) {
      throw new Error(error.response.data.message || 'Error adding book. Please check the provided information.');
    } else {
      throw error;
    }
  }
};*/

// Update a book
export const updateBook = async (id, updatedBook) => {
  try {
    console.log("Updating book with ID:", id); 
    const response = await axios.put(`${API_URL}/books/${id}`, updatedBook);
    return response.data;
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};


// Delete a book
export const deleteBook = async (id) => {
  const response = await axios.delete(`${API_URL}/books/${id}`);
  return response.data;
};