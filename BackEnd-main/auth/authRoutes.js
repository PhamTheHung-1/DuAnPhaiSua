const Account = require("../users/Account");
const User= require("../users/User")

async function authRoutes(fastify, opts) {

  fastify.addHook('onReady', async () => {
    const adminExists = await Account.findOne({ role: 'admin' });
    if (!adminExists) {
      const adminAccount = new Account({
        email: 'admin@example.com',
        password: 'admin123', // Use hashed password in production
        role: 'admin'
      });
      await adminAccount.save();
      
      const adminUser = new User({
        firstName: 'Admin',
        lastName: 'User',
        accountId: adminAccount._id
      });
      await adminUser.save();
    }
  });

  fastify.post('/register', async (req, rep) => {
    try {
      const { email, password, role, firstName, lastName} = req.body;
  
      // Tạo tài khoản
      const account = new Account({ email, password, role });
      await account.save();
  
      // Tạo user
      const user = new User({
        firstName,
        lastName,
        accountId: account._id,
      });
      await user.save();
  
      rep.send({ message: 'Đăng ký thành công!' });
    } catch (err) {
      rep.send({ error: 'Đăng kí thật bại', details: err });
    }
  });

  // Route đăng nhập
  fastify.post('/login', async (req, rep) => {
    const { email, password } = req.body;

    try {
      const account = await Account.findOne({ email });
      if (!account || !account.verifyPassword(password)) {
        return rep.send({ error: 'Mật khẩu hoặc Email không đúng' });
      }

      const token = fastify.jwt.sign({ id: account._id, email: account.email, role: account.role });
      rep
        .setCookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Strict',
        })
        .send({ 
          message: 'Đăng nhập thành công',
          user: { role: account.role, token }
        });
    } catch (err) {
      rep.send({ error: 'Đăng nhập thất bại', details: err });
    }
  });

  fastify.post('/logout', async (req, rep) => {
    rep.clearCookie('token').send({ message: 'Logged out successfully' });
  });
}

module.exports = authRoutes;