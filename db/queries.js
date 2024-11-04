const pool = require("./pool");

async function getProducts() {
  const { rows } = await pool.query(`select id,name from product;`);
  return rows;
}

async function getProductWith(id) {
  const { rows } = await pool.query(
    `
SELECT product.id, product.name as products, 
seller.name as sellers, category.name as categories
FROM product
INNER JOIN seller_product
ON product.id = seller_product.product_id
INNER JOIN seller
ON seller.id = seller_product.seller_id 
INNER JOIN category_product
ON product.id = category_product.product_id 
INNER JOIN category
ON category_product.product_id= category.id 
WHERE product.id  = ($1);
`,
    [id]
  );
  return rows;
}

async function postProduct(name) {
  await pool.query(`INSERT INTO category (name) VALUES ($1)`, [name]);
}

async function postProductCategory(idProduct, idCategory) {
  await pool.query(
    `INSERT INTO category_product (category_id, product_id) VALUES ($1,$2)`,
    [idCategory, idProduct]
  );
}

async function postProductSeller(idProduct, idSeller) {
  await pool.query(
    `INSERT INTO category_product (seller_id, product_id) VALUES ($1,$2)`,
    [idSeller, idProduct]
  );
}

async function getCategories() {
  const { rows } = await pool.query(`SELECT id,name FROM category`);
  return rows;
}

async function postCategory(name) {
  await pool.query(`INSERT INTO category (name) VALUES ($1)`, [name]);
}

async function getCategoriesWith(id) {
  const { rows } = await pool.query(
    `
SELECT product.id, product.name as product_name, category.name as category_name
FROM category
INNER JOIN category_product
ON category.id = category_product.category_id
INNER JOIN product
ON product.id = category_product.product_id
WHERE category.id = ($1);
`,
    [id]
  );
  return rows;
}

async function getSellers() {
  const { rows } = await pool.query(`SELECT id,name FROM seller;`);
  return rows;
}

async function getSellerWith(id) {
  const { rows } = await pool.query(
    `
SELECT product.id, product.name as product_name, 
seller.name as seller_name
FROM product
INNER JOIN seller_product
ON product.id = seller_product.product_id
INNER JOIN seller
ON seller.id = seller_product.seller_id 
WHERE seller.id  = ($1);
`,
    [id]
  );
  return rows;
}

async function postSeller(name) {
  await pool.query(`INSERT INTO seller (name) VALUES ($1)`, [name]);
}

module.exports = {
  getProducts,
  postProduct,
  postProductCategory,
  postProductSeller,
  getProductWith,
  getCategories,
  postCategory,
  getCategoriesWith,
  getSellers,
  getSellerWith,
  postSeller,
};
