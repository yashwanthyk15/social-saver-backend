const express = require("express");
const router = express.Router();
const Content = require("../models/Content");

/* ================================
   1️⃣ Get All Content
================================ */
router.get("/all/:phone", async (req, res) => {
  try {
    const { phone } = req.params;

    const data = await Content.find({ userPhone: phone })
      .sort({ createdAt: -1 });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch content" });
  }
});

/* ================================
   2️⃣ Search Content
================================ */
router.get("/search/:phone", async (req, res) => {
  try {
    const { phone } = req.params;
    const { q } = req.query;

    const results = await Content.find({
      userPhone: phone,
      $or: [
        { aiSummary: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
        { caption: { $regex: q, $options: "i" } }
      ]
    }).sort({ createdAt: -1 });

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Search failed" });
  }
});

/* ================================
   3️⃣ Filter by Category
================================ */
router.get("/category/:phone/:cat", async (req, res) => {
  try {
    const { phone, cat } = req.params;

    const data = await Content.find({
      userPhone: phone,
      category: cat
    }).sort({ createdAt: -1 });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Category filter failed" });
  }
});

/* ================================
   4️⃣ Random Item
================================ */
router.get("/random/:phone", async (req, res) => {
  try {
    const { phone } = req.params;

    const count = await Content.countDocuments({ userPhone: phone });
    const random = Math.floor(Math.random() * count);

    const item = await Content.findOne({ userPhone: phone })
      .skip(random);

    res.json(item || { message: "No content found" });
  } catch (error) {
    res.status(500).json({ error: "Random fetch failed" });
  }
});

/* ================================
   5️⃣ Delete Item
================================ */
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Content.findByIdAndDelete(id);

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;