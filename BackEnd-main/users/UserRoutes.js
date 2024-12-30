const UserController = require('./UserController');

const routes = [
{
        method: 'GET',
        url: '/users',
        handler: UserController.getAllUsers
},

{
        method: 'GET',
        url: '/users/:id',
        handler: UserController.getUserById
},

{
        method: 'POST',
        url: '/adduser',
        handler: UserController.addNewUser
},

{
        method: 'PUT',
        url: '/users/:id',
        handler: UserController.updateUser
},

{
        method: 'DELETE',
        url:'/users/:id',
        handler: UserController.deleteUser
}

]
module.exports = routes;