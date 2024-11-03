const db = require("../db/queries");

exports.getSellers = async (req, res) => {
  const sellers = await db.getSellers();
  res.render("sellers", { sellers: sellers });
};

exports.getSellerWith = async (req, res) => {
  const { id } = req.params;
  const products = await db.getSellerWith(id);
  res.render("sellerPage", { products: products });
};
