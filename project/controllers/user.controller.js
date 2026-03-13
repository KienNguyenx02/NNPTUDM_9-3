const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

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