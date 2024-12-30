const User = require('./User')

// đưa ra danh sách users
async function getAllUsers(req, rep) {
  try {
      const users = await User.find();
      return rep.status(200).send({ success: true, data: users });
  } catch (error) {
      return rep.status(500).send({ success: false, error: error.message });
  }
}

// Lấy thông tin một user bằng id
async function getUserById(req, rep) {
  try {
      const user = await User.findById(req.params.id);
      if (!user) {
          return rep.status(404).send({ success: false, message: 'User not found' });
      }
      return rep.status(200).send({ success: true, data: user });
  } catch (error) {
      return rep.status(500).send({ success: false, error: error.message });
  }
}

// Thêm user mới
async function addNewUser(req, rep) {
  try {
      const user = new User(req.body);
      await user.save();
      return rep.status(201).send({ success: true, data: user });
  } catch (error) {
      return rep.status(400).send({ success: false, error: error.message });
  }
}

// Cập nhật thông tin user
async function updateUser(req, rep) {
  try {
      const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true, runValidators: true }
      );
      if (!updatedUser) {
          return rep.status(404).send({ success: false, message: 'User not found' });
      }
      return rep.status(200).send({ success: true, data: updatedUser });
  } catch (error) {
      return rep.status(400).send({ success: false, error: error.message });
  }
}

// Xóa user
async function deleteUser(req, rep) {
  try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
          return rep.status(404).send({ success: false, message: 'User not found' });
      }
      return rep.status(200).send({ success: true, message: 'User deleted successfully' });
  } catch (error) {
      return rep.status(500).send({ success: false, error: error.message });
  }
}

module.exports={
    getAllUsers,
    getUserById,
    addNewUser,
    updateUser,
    deleteUser,
}