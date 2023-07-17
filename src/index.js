const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;
const routes = require("./routes/routes");
app.use("/api", routes);
app.listen(port, () => {
  console.log(`server start on port ${port}`);
});
