const express = require("express");
const indexRouter = require("./routes/indexRouter");
const productRouters = require("./routes/productRouters");
const categoryRouters = require("./routes/categoryRouters");
const sellerRouters = require("./routes/sellerRouters");

const path = require("node:path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.use("/products", productRouters);
app.use("/categories", categoryRouters);
app.use("/sellers", sellerRouters);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`app listen in port ${PORT}`);
});
