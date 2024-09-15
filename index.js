const express = require("express");
const { fetchRouter } = require("./routes/fetch.toute");
const app = express();
port = 3000;
app.use("/", fetchRouter);
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
