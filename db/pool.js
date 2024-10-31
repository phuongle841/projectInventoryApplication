const { Pool } = require("pg");
const env = require("dotenv").config().parsed;

// All of the following properties should be read from environment variables
// We're hardcoding them here for simplicity
module.exports = new Pool({
  host: "localhost", // or wherever the db is hosted
  user: env.user,
  database: "shopping",
  password: env.password,
  port: 5432, // The default port
});
