const pool = require("./pool");

async function getProducts() {
  const { rows } = await pool.query(`select id,name from product;`);
  return rows;
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

async function postUpdateProduct(idProduct, idSellers) {
  for (let i = 0; i < idSellers.length; i++) {
    const idSeller = idSellers[i];
    // delete all the old ones
    // insert the new ones into there
  }
}

async function getCategories() {
  const { rows } = await pool.query(`SELECT id,name FROM category`);
  return rows;
}

async function postCategory(name) {
  await pool.query(`INSERT INTO category (name) VALUES ($1)`, [name]);
}

async function getCategoriesWith(id) {
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

async function getSellers() {
  const { rows } = await pool.query(`SELECT id,name FROM seller;`);
  return rows;
}

async function getSellerWith(id) {
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

async function postSeller(name) {
  await pool.query(`INSERT INTO seller (name) VALUES ($1)`, [name]);
}

module.exports = {
  getProducts,
  postProduct,
  postProductCategory,
  postProductSeller,
  getProductCategory,
  getProductSeller,
  getCategories,
  postCategory,
  getCategoriesWith,
  getSellers,
  getSellerWith,
  postSeller,
};
