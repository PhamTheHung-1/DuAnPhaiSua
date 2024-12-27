const UserController = require('./UserController');

const routes = [
{
        method: 'GET',
        url: '/users',
        handler: UserController.getAllUsers
},

{
        method: 'GET',
        url: '/update-user/:id',
        handler: UserController.getUserById
},

{
        method: 'POST',
        url: '/user',
        handler: UserController.addNewUser
},

{
        method: 'POST',
        url: '/user/:id',
        handler: UserController.updateUser
},

{
        method: 'GET',
        url:'/users/:id',
        handler: UserController.deleteUser
}

]
module.exports = routes;