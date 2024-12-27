const User = require('./User')

// đưa ra danh sách users
async function getAllUsers(req, rep){
    try {
        const users = await User.find();
        rep.render("users", { users })

        return rep;
        //rep.send(users);
      } catch (error) {
        rep.status(500).send(error);
      }
}

//đưa ra 1 user bằng id
async function getUserById(req, rep){
    try {
        const user = await User.findById(req.params.id);
        rep.render("update-user", { user });
        return rep;
        //rep.send(user);
      } catch (error) {
        rep.status(500).send(error);
      }
}

//thêm user mới
async function addNewUser(req, rep){
    try {
        const user = new User(req.body);
        await user.save();
        
        rep.redirect("/users")
        //rep.status(201).send(user);
      } catch (error) {
        rep.status(500).send(error);
      }
}

//cập nhật thông tin user
async function updateUser(req, rep){
    try {
        const result = await User.findByIdAndUpdate(
        req.params.id,
        {firstName,lastName,address,phoneNumber}=req.body,
        { new: true,runValidators: true }
      );
        //rep.send(result);
        rep.redirect("/users");
      } catch (error) {
        rep.status(500).send(error);
      }
}
//xóa user
async function deleteUser(req, rep){
    try {
        const result=await User.findByIdAndDelete(req.params.id);
        return rep.redirect("/users")
        //return rep.code(204).send()
      } catch (error) {
        rep.status(500).send(error);
      }
};

module.exports={
    getAllUsers,
    getUserById,
    addNewUser,
    updateUser,
    deleteUser,
}