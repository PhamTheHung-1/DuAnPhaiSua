const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
{
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
},
);

module.exports = mongoose.model('User', userSchema)