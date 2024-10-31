const db = require("../db/queries");
exports.getIndex = (req, res) => {
  res.render("index");
};

exports.getCategories = (req, res) => {
  res.render("categories");
};

exports.getSellers = (req, res) => {
  res.render("sellers");
};
