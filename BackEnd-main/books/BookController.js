const boom = require('@hapi/boom');
const Book = require('./Book');
const path = require("path");
const fs = require('fs')
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
    // Kiểm tra nếu không có file trong request
    const file = req.body.file; // Trường file từ form
    if (!file) {
      throw new Error("No file uploaded");
    }

    console.log("File received:", file);

    // Kiểm tra và tạo thư mục lưu file
    const imgDir = path.join(__dirname, "public", "img");
    if (!fs.existsSync(imgDir)) {
      fs.mkdirSync(imgDir, { recursive: true });
    }

    // Tạo đường dẫn lưu file
    const uploadPath = path.join(imgDir, file.filename);

    // Sử dụng pipeline để lưu stream của file
    await pipeline(file.file, fs.createWriteStream(uploadPath));

    console.log("File saved at:", uploadPath);

    // Tạo bản ghi sách mới từ các trường trong form
    const newBook = new Book({
      image: `/img/${file.filename}`,
      title: req.body.title.value, 
      description: req.body.description.value,
      genre: req.body.genre.value,
      author: req.body.author.value,
      price: parseFloat(req.body.price.value), // Chuyển thành số
      page: parseInt(req.body.page.value, 10), // Chuyển thành số nguyên
      code: req.body.code.value,
    });

    
    // Lưu sách vào DB
    await newBook.save();

    // Trả phản hồi
    rep.code(201).send({ message: "Book added successfully", book: newBook });
  } catch (err) {
    console.error(err);
    throw boom.boomify(err);
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

