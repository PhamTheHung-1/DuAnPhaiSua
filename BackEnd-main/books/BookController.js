const boom = require('@hapi/boom');
const Book = require('./Book');
const fs = require('fs')
const pump = require('pump')
const {pipeline} = require('stream/promises')


// Fetch all books
async function getAllBooks(req, rep) {
  try {
    const books = await Book.find();
    rep.send(books);
  } catch (err) {
    throw boom.boomify(err);
  }
}

// Fetch a book by ID
async function getSingleBookById(req, rep) {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return rep.code(404).send({ message: "Book not Found!" });
    }
    rep.code(200).send(book);
  } catch (err) {
    throw boom.boomify(err);
  }
}

// Add a new book
async function addNewBook(req, rep) {
  try {
    const { image } = req.body;

    if (!image) {
      throw new Error("No image file uploaded");
    }

    // Image là một stream đọc, cần lưu vào đĩa
    const imgPath = `public/img/${image.filename}`;
    const writeStream = fs.createWriteStream(imgPath);
    await pump(image.file, writeStream); // Lưu ảnh vào thư mục server

    const newBook = {
      image: image.filename, 
      title: req.body.title.value,
      description: req.body.description.value,
      genre: req.body.genre.value,
      author: req.body.author.value ,
      price: parseFloat(req.body.price.value),
      page: parseInt(req.body.page.value, 10),
      code: req.body.code.value,
    };

    let book = new Book(newBook);
    await book.save(); // Lưu sách vào cơ sở dữ liệu
    return rep.code(200).send({
      message: "New book added successfully",
      data: newBook,
    });
  } catch (err) {
    console.error("Error adding book:", err);
    if (err.name === "ValidationError") {
      return rep.code(400).send({
        message: "Validation Error",
        field: err.errors, // Trả về lỗi chi tiết từ Mongoose nếu có
      });
    }
    return rep.code(500).send({ message: "Error adding book", error: err.message });
  }
}


// Update book details
async function updateBook(req, rep) {
  try {
    const { id } = req.params;
    console.log("Updating book with ID:", id);
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBook) {
      return rep.code(404).send({ message: "Book not Found!" });
    }
    rep.code(200).send({ message: "Book updated successfully", book: updatedBook });
  } catch (err) {
    throw boom.boomify(err);
  }
}

// Delete a book
async function deleteBook(req, rep) {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return rep.code(404).send({ message: "Book not Found!" });
    }
    rep.code(200).send({ message: "Book deleted successfully", book: deletedBook });
  } catch (err) {
    throw boom.boomify(err);
  }
}

module.exports = {
  getAllBooks,
  getSingleBookById,
  addNewBook,
  updateBook,
  deleteBook,
};

