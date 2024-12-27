// routes/auth.js
const Account = require("../users/Account");
const User= require("../users/User")

async function authRoutes(fastify, opts) {

  fastify.post('/register', async (req, rep) => {
    try {
      const { username, password, role, firstName, lastName, address, email, phoneNumber } = req.body;
  
      // Tạo tài khoản
      const account = new Account({ username, password, role });
      await account.save();
  
      // Tạo user
      const user = new User({
        firstName,
        lastName,
        address,
        email,
        phoneNumber,
        accountId: account._id,
      });
      await user.save();
  
      rep.redirect('/login');
    } catch (err) {
      rep.send({ error: 'User registration failed', details: err });
    }
  });

  // Route đăng nhập
  fastify.post('/login', async (req, rep) => {
    const { username, password } = req.body;

    try {
      const account = await Account.findOne({ username });
      if (!account || !account.verifyPassword(password)) {
        return rep.send({ error: 'Invalid username or password' });
      }

      // Đăng nhập và tạo JWT và đặt vào cookie
      const token = fastify.jwt.sign({ id: account._id, username: account.username, role: account.role});
      rep
        .setCookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Strict',
        })
        .redirect(account.role === 'admin' ? '/admin' : '/user-dashboard'); // Điều hướng dựa trên vai trò
    } catch (err) {
      rep.send({ error: 'Login failed', details: err });
    }
  });

  fastify.post('/logout', async (req, rep) => {
    rep.clearCookie('token')
        .redirect("/");
  });

}

module.exports = authRoutes;
