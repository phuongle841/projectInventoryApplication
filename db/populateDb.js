const { Client } = require("pg");
const env = require("dotenv").config().parsed;

const SQL = `
CREATE TABLE IF NOT EXISTS product (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS category (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS seller (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS category_product (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category_id INTEGER REFERENCES category(id),
  product_id INTEGER references product(id)
);

CREATE TABLE IF NOT EXISTS seller_product (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  seller_id INTEGER REFERENCES seller(id),
  product_id INTEGER references product(id)
);



INSERT INTO product (name) 
VALUES
  ('cookers'),
  ('apples'),
  ('computers');

INSERT INTO category (name) 
VALUES
  ('home appliances'),
  ('fruits'),
  ('components');

INSERT INTO seller (name) 
VALUES
  ('Jean'),
  ('Lisa'),
  ('Amber');

INSERT INTO category_product (category_id,product_id) 
VALUES
  (1,1),
  (2,2),
  (3,3);

INSERT INTO seller_product (seller_id,product_id) 
VALUES
  (1,1),
  (2,2),
  (3,3);
`;

async function main() {
  console.log("seeding...");

  const client = new Client({
    connectionString: `postgresql://${env.user}:${env.password}@localhost:5432/shopping`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();

  console.log("done");
}
main();
