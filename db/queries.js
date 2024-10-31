const pool = require("./pool");

async function getProducts() {
  const { rows } = await pool.query(`select * from product;`);

  return rows;
}

async function getProductWith(id) {
  const { rows } = await pool.query(
    `
SELECT product.id, product.name as product_name, 
seller.name as seller_name, category.name as category_name
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

module.exports = { getProducts, getProductWith };
