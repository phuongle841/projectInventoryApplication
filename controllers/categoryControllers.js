const db = require("../db/queries");

exports.getCategories = async (req, res) => {
  const categories = await db.getCategories();
  res.render("categories", { categories: categories });
};

exports.getCategoryProducts = async (req, res) => {
  const { id } = req.params;
  const products = await db.getCategoryProducts(id);
  const [{ name }] = await db.getCategoryInformation(id);
  res.render("categoryPage", { products: products, id: id, name: name });
};

exports.getCreateCategory = async (req, res) => {
  let categories = await db.getCategories();
  res.render("categoryCreateForm", { categories: categories });
};

exports.getUpdateCategory = async (req, res) => {
  const { id } = req.params;
  const [information] = await db.getCategoryInformation(id);
  res.render("categoryUpdateForm", { information: information, id: id });
};

exports.getDeleteCategory = async (req, res) => {
  const { id } = req.params;
  res.render("categoryDeleteForm", { id: id });
};

exports.postCreateCategory = async (req, res) => {
  const { name } = req.body;
  await db.postCategory(name);
  res.redirect("/categories");
};

exports.postUpdateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  await db.postCategoryInformation(id, name);
  res.redirect("/categories");
};

exports.postDeleteCategory = async (req, res) => {
  const { id } = req.params;
  await db.postDeleteCategory(id);
  res.redirect("/categories");
};
