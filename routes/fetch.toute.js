const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { default: axios } = require("axios");
const express = require("express");
const fetchRouter = express.Router();

fetchRouter.get("/storetodb", async (req, res) => {
  try {
    const resp = await axios.get("https://api.wazirx.com/api/v2/tickers");

    // Extracting the data and selecting the first 10 elements
    const tickersData = Object.values(resp.data).slice(0, 10);

    // Insert data into the database concurrently
    await Promise.all(
      tickersData.map(async (ticker) => {
        await prisma.data.create({
          data: {
            base_umit: ticker.base_unit, // Fixed typo here
            buy: ticker.buy,
            last: ticker.last,
            name: ticker.name,
            sell: ticker.sell,
            volume: ticker.volume,
          },
        });
      })
    );

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

fetchRouter.get("/show", async (req, res) => {
  try {
    const data = await prisma.data.findMany();
    return res.json({
      success: true,
      data,
    });
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