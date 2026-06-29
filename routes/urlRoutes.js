const express = require("express");
const router = express.Router();

const {
  shortenUrl,
  redirectUrl,
  getAllUrls,
  deleteUrl
} = require("../controllers/urlController");

router.post("/api/shorten", shortenUrl);
router.get("/api/urls", getAllUrls);
router.get("/:shortCode", redirectUrl);
router.delete("/api/urls/:id", deleteUrl);


module.exports = router;
