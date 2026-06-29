const Url = require("../models/url");
const { nanoid } = require("nanoid");

const shortenUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    console.log("Request Body:", req.body);
    console.log("Original URL:", originalUrl);

    if (!originalUrl) {
      return res.status(400).json({
        message: "Original URL is required",
      });
    }
    const shortCode = nanoid(6);
    const newUrl = new Url({
      originalUrl,
      shortCode,
    });

    console.log("🔥 SAVING URL TO DATABASE");
    await newUrl.save();
    console.log("✅ URL SAVED");

    res.status(201).json({
      message: "URL Shortened Successfully",
      shortUrl: `http://localhost:5000/${shortCode}`,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const redirectUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({
        message: "URL Not Found",
      });
    }

    url.clicks += 1;
    await url.save();

    res.redirect(url.originalUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getAllUrls = async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });

    res.status(200).json(urls);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const deleteUrl = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUrl = await Url.findByIdAndDelete(id);

    if (!deletedUrl) {
      return res.status(404).json({
        message: "URL not found",
      });
    }

    res.json({
      message: "URL deleted successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  shortenUrl,
  redirectUrl,
  getAllUrls,
  deleteUrl
};
