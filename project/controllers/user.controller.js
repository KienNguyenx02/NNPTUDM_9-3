const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

exports.getAll = async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] } // Không trả về mật khẩu
  });
  res.json(users);
};

exports.update = async (req, res) => {
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
  }
  await User.update(req.body, {
    where: { id: req.params.id }
  });
  res.json({ message: "User updated" });
};

exports.delete = async (req, res) => {
  await User.destroy({
    where: { id: req.params.id }
  });
  res.json({ message: "User deleted" });
};

exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findByPk(req.user.id);

  const isMatch = bcrypt.compareSync(oldPassword, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Old password incorrect" });
  }

  const hash = bcrypt.hashSync(newPassword, 8);
  await user.update({ password: hash });

  res.json({ message: "Password changed" });
};