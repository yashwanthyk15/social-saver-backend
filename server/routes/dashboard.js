const express = require("express");
const router = express.Router();
const Content = require("../models/Content");
const authMiddleware = require("../middleware/auth");

/* ================================
   Get All Content
================================ */
router.get("/all", authMiddleware, async (req, res) => {
  try {
    const phone = req.userPhone;

    const data = await Content.find({ userPhone: phone })
      .sort({ createdAt: -1 });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch content" });
  }
});

/* ================================
   Get Categories
================================ */
router.get("/categories", authMiddleware, async (req, res) => {
  try {
    const phone = req.userPhone;

    const categories = await Content.distinct("category", {
      userPhone: phone,
      category: { $exists: true, $ne: null }
    });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

/* ================================
   Search
================================ */
router.get("/search", authMiddleware, async (req, res) => {
  try {
    const phone = req.userPhone;
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
   Filter by Category
================================ */
router.get("/category/:cat", authMiddleware, async (req, res) => {
  try {
    const phone = req.userPhone;
    const { cat } = req.params;

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
   Random
================================ */
router.get("/random", authMiddleware, async (req, res) => {
  try {
    const phone = req.userPhone;

    const count = await Content.countDocuments({ userPhone: phone });

    if (count === 0) {
      return res.json({ message: "No content found" });
    }

    const random = Math.floor(Math.random() * count);

    const item = await Content.findOne({ userPhone: phone }).skip(random);

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Random fetch failed" });
  }
});

/* ================================
   Delete
================================ */
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    await Content.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;