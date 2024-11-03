const db = require("../db/queries");

exports.getProducts = async (req, res) => {
  const products = await db.getProducts();
  res.render("products", { products: products });
};

exports.getProductWith = async (req, res) => {
  const { id } = req.params;
  const product = await db.getProductWith(id);
  console.log(product);

  res.render("productPage", { product: product[0] });
};
