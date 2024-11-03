const db = require("../db/queries");

exports.getCategories = async (req, res) => {
  const categories = await db.getCategories();
  res.render("category", { categories: categories });
};

exports.getCategoriesWith = async (req, res) => {
  const { id } = req.params;
  const products = await db.getCategoriesWith(id);

  if (products.length != 0) {
    res.render("categoryPage", { products: products });
  } else {
    res.send("product is in working stage");
  }
};

exports.getCreateCategory = async (req, res) => {
  let categories = await db.getCategories();
  res.render("categoryCreateForm", { categories: categories });
};

exports.postCreateCategory = async (req, res) => {
  const { name } = req.body;
  await db.postCategory(name);
  await res.redirect("/categories");
};
