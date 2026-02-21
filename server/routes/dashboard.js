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
   2️⃣ Get All Unique Categories
================================ */
router.get("/categories/:phone", async (req, res) => {
  try {
    const { phone } = req.params;

    const categories = await Content.distinct("category", {
      userPhone: phone,
      category: { $exists: true, $ne: null, $ne: "" }
    });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

/* ================================
   3️⃣ Search Content
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
   4️⃣ Filter by Category
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
   5️⃣ Random Item
================================ */
router.get("/random/:phone", async (req, res) => {
  try {
    const { phone } = req.params;

    const count = await Content.countDocuments({ userPhone: phone });

    if (count === 0) {
      return res.json({ message: "No content found" });
    }

    const random = Math.floor(Math.random() * count);

    const item = await Content.findOne({ userPhone: phone })
      .skip(random);

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Random fetch failed" });
  }
});

/* ================================
   6️⃣ Delete Item
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