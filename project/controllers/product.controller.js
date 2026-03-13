const Product = require("../models/product.model");

exports.getAll = async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
};

exports.create = async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
};

exports.update = async (req, res) => {
  await Product.update(req.body, {
    where: { id: req.params.id }
  });
  res.json({ message: "Updated" });
};

exports.delete = async (req, res) => {
  await Product.destroy({
    where: { id: req.params.id }
  });
  res.json({ message: "Deleted" });
};