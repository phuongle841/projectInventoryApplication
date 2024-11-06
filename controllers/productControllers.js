const db = require("../db/queries");

exports.getProducts = async (req, res) => {
  const products = await db.getProducts();
  res.render("products", { products: products });
};

exports.getProductWith = async (req, res) => {
  const { id } = req.params;
  const categories = await db.getProductCategory(id);
  const sellers = await db.getProductSeller(id);
  res.render("productPage", {
    categories: categories,
    sellers: sellers,
    id: id,
  });
};

exports.getCreateProduct = async (req, res) => {
  const sellers = await db.getSellers();
  const categories = await db.getCategories();
  res.render("productCreateForm", { categories: categories, sellers: sellers });
};

exports.getUpdateProduct = async (req, res) => {
  // return an display of old object
  // and a list of the things
  // reedit the thing in database
  const { id } = req.params;
  const sellers = await db.getSellers();
  const categories = await db.getCategories();
  res.render("productUpdateForm", {
    categories: categories,
    sellers: sellers,
    id: id,
  });
};

exports.postCreateProduct = async (req, res) => {
  const { name, categories, sellers } = req.body;
  const id = await db.postProduct(name);
  await db.postProductCategory(id, categories);
  await db.postProductSeller(id, sellers);
  res.redirect("/products");
};

exports.postUpdateProduct = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);

  res.redirect(`/products/${id}`);
};
