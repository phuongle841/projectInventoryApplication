const db = require("../db/queries");

exports.getSellers = async (req, res) => {
  const sellers = await db.getSellers();
  res.render("sellers", { sellers: sellers });
};

exports.getSellerProducts = async (req, res) => {
  const { id } = req.params;
  const products = await db.getSellerProducts(id);
  const [{ name }] = await db.getSellersInformation(id);
  res.render("sellerPage", { products: products, id: id, name: name });
};

exports.getCreateSeller = async (req, res) => {
  const sellers = await db.getSellers();
  res.render("sellerCreateForm", { sellers: sellers });
};

exports.getUpdateSeller = async (req, res) => {
  const { id } = req.params;
  const [information] = await db.getSellersInformation(id);
  res.render("sellerUpdateForm", { information: information, id: id });
};

exports.getDeleteSeller = async (req, res) => {
  const { id } = req.params;
  res.render("sellerDeleteForm", { id: id });
};

exports.postCreateSeller = async (req, res) => {
  const { name } = req.body;
  await db.postSeller(name);
  res.redirect("/sellers");
};

exports.postUpdateSeller = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  await db.postSellerInformation(id, name);
  res.redirect("/sellers");
};

exports.postDeleteSeller = async (req, res) => {
  const { id } = req.params;
  await db.postDeleteSeller(id);
  res.redirect("/sellers");
};
