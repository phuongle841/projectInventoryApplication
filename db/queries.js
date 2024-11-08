const pool = require("./pool");

async function getProducts() {
  const { rows } = await pool.query(`select id,name from product;`);
  return rows;
}

async function getProductInformation(id) {
  const { rows } = await pool.query("SELECT * FROM product WHERE id = $1", [
    id,
  ]);
  return rows;
}

async function postProductInformation(id, name) {
  await pool.query(`UPDATE product SET name  = $1 WHERE id = $2;`, [name, id]);
}

async function getProductCategory(id) {
  const { rows } = await pool.query(
    `
SELECT category.id, category.name as name
FROM product
INNER JOIN category_product
ON product.id = category_product.product_id
INNER JOIN category
ON category.id = category_product.category_id
WHERE product.id  = ($1);
`,
    [id]
  );
  return rows;
}

async function getProductSeller(id) {
  const { rows } = await pool.query(
    `
SELECT seller.id, seller.name as name
FROM product
INNER JOIN seller_product
ON product.id = seller_product.product_id
INNER JOIN seller
ON seller.id = seller_product.seller_id
WHERE product.id  = ($1);
`,
    [id]
  );
  return rows;
}

async function postProduct(name) {
  let { rows } = await pool.query(
    `INSERT INTO product (name) VALUES ($1) RETURNING id`,
    [name]
  );
  return rows[0].id;
}

async function postProductCategory(idProduct, idCategories) {
  for (let i = 0; i < idCategories.length; i++) {
    const idCategory = idCategories[i];
    await pool.query(
      `INSERT INTO category_product (category_id, product_id) VALUES ($1,$2)`,
      [idCategory, idProduct]
    );
  }
}

async function postProductSeller(idProduct, idSellers) {
  for (let i = 0; i < idSellers.length; i++) {
    const idSeller = idSellers[i];
    await pool.query(
      `INSERT INTO seller_product (seller_id, product_id) VALUES ($1,$2)`,
      [idSeller, idProduct]
    );
  }
}

async function postUpdateProductCategory(idProduct, idCategories) {
  // delete all the old ones
  await pool.query(
    `
    DELETE FROM category_product WHERE product_id = $1;
    `,
    [idProduct]
  );
  for (let i = 0; i < idCategories.length; i++) {
    const idCategory = idCategories[i];
    // insert the new ones into there
    await pool.query(
      `INSERT INTO category_product (category_id, product_id) VALUES ($1,$2)`,
      [idCategory, idProduct]
    );
  }
}

async function postUpdateProductSeller(idProduct, idSellers) {
  // delete all the old ones
  await pool.query(
    `
    DELETE FROM seller_product WHERE product_id = $1;
    `,
    [idProduct]
  );
  for (let i = 0; i < idSellers.length; i++) {
    const idSeller = idSellers[i];
    // insert the new ones into there
    await pool.query(
      `INSERT INTO seller_product (seller_id, product_id) VALUES ($1,$2)`,
      [idSeller, idProduct]
    );
  }
}

async function postDeleteProduct(id) {
  await pool.query("DELETE FROM seller_product WHERE product_id = $1;", [id]);
  await pool.query("DELETE FROM category_product WHERE product_id = $1;", [id]);
  await pool.query("DELETE FROM product WHERE id = $1;", [id]);
}

async function getCategories() {
  const { rows } = await pool.query(`SELECT id,name FROM category ORDER BY id`);
  return rows;
}

async function postCategory(name) {
  await pool.query(`INSERT INTO category (name) VALUES ($1)`, [name]);
}

async function getCategoryProducts(id) {
  // return product with the same category id
  const { rows } = await pool.query(
    `
SELECT product.id, product.name as name
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
async function getCategoryInformation(id) {
  const { rows } = await pool.query("SELECT * FROM category WHERE id = $1", [
    id,
  ]);
  return rows;
}

async function postCategoryInformation(id, name) {
  await pool.query(`UPDATE category SET name  = $1 WHERE id = $2;`, [name, id]);
}

async function postDeleteCategory(id) {
  await pool.query("DELETE FROM category_product WHERE id = $1;", [id]);
  await pool.query("DELETE FROM category WHERE id = $1;", [id]);
}

async function getSellers() {
  const { rows } = await pool.query(`SELECT id,name FROM seller;`);
  return rows;
}

async function getSellerProducts(id) {
  // return products with the same seller id

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

async function getSellersInformation(id) {
  const { rows } = await pool.query("SELECT * FROM seller WHERE id = $1", [id]);
  return rows;
}

async function postSeller(name) {
  await pool.query(`INSERT INTO seller (name) VALUES ($1)`, [name]);
}

async function postSellerInformation(id, name) {
  await pool.query(`UPDATE seller SET name  = $1 WHERE id = $2;`, [name, id]);
}

async function postDeleteSeller(id) {
  await pool.query("DELETE FROM seller_product WHERE seller_id = $1;", [id]);
  await pool.query("DELETE FROM seller WHERE id = $1;", [id]);
}

module.exports = {
  getProducts,
  getProductInformation,
  postProductInformation,
  postProduct,
  postProductCategory,
  postProductSeller,
  getProductCategory,
  getProductSeller,
  postUpdateProductCategory,
  postUpdateProductSeller,
  postDeleteProduct,
  getCategories,
  postCategory,
  getCategoryProducts,
  getCategoryInformation,
  postCategoryInformation,
  postDeleteCategory,
  getSellers,
  postSeller,
  getSellerProducts,
  getSellersInformation,
  postSellerInformation,
  postDeleteSeller,
};
