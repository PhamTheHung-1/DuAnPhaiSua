const BookController = require('../books/BookController')

const routes = [
{
        method: 'GET',
        url: '/books',
        handler: BookController.getAllBooks
},

{
        method: 'GET',
        url: '/books/:id',
        handler: BookController.getSingleBookById
},
{
        method: 'POST',
        url: '/add-book',
        handler: BookController.addNewBook
},
{
        method: 'PUT',
        url: '/books/:id',
        handler: BookController.updateBook
},
{
        method: 'DELETE',
        url:'/books/:id',
        handler: BookController.deleteBook
}
]
module.exports = routes;