const express = require("express");
const cors = require("cors");
const { fetchRouter } = require("./routes/fetch.toute");
const app = express();


app.use(express.json());
app.use(cors());

port = 3000;
app.use("/", fetchRouter);
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
