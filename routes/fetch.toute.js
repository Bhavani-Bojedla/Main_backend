import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const { default: axios } = require("axios");
const express = require("express");
const fetchRouter = express.Router();

fetchRouter.get("/storetodb", async (req, res) => {
  try {
    const resp = await axios.get("https://api.wazirx.com/api/v2/tickers");

    // Extracting the data and selecting the first 10 elements
    const tickersData = Object.values(resp.data).slice(0, 10);
    for (i = 0; i < 10; i++) {
      await prisma.data.create({
        data: {
          base_umit: tickersData[i].base_unit,
          buy: tickersData[i].buy,
          last: tickersData[i].last,
          name: tickersData[i].name,
          sell: tickersData[i].sell,
          volume: tickersData[i].volume,
        },
      });
    }
    return res.json({
      success: true,
      data: tickersData,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
});
fetchRouter.get("/show", (req, res) => {
  try {
  } catch (error) {
    return res.json({
      success: false,
      message: "Something went wrong",
    });
  }
});
module.exports = {
  fetchRouter,
};
