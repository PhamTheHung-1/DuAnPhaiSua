const mongoose = require('mongoose');
const crypto=require('crypto');

const accountSchema = new mongoose.Schema(
{
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
});



// Hàm băm của mật khẩu sử dụng HMAC
accountSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.createHmac('sha256', salt)
                     .update(this.password)
                     .digest('hex');

  this.password = `${salt}$${hash}`; // tích hợp salt và hash trong mật khẩu
  next();
});

// Method để kiểm tra mật khẩu 
accountSchema.methods.verifyPassword = function (password) {
  const [salt, storedHash] = this.password.split('$');
  const hpass = crypto.createHmac('sha256', salt)
                     .update(password)
                     .digest('hex');
  return hpass === storedHash;
};

module.exports = mongoose.model('Account', accountSchema)