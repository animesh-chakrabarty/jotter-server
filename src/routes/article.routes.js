const express = require("express");
const {
  fetchFeaturedArticles,
  fetchArticleById,
  handleCreateArticle,
  handleEditArticle,
} = require("../controllers/article.controllers");

const router = express.Router();

router.get("/", fetchFeaturedArticles);
router.get("/:articleId", fetchArticleById);
router.post("/create", handleCreateArticle);
router.patch("/edit/:articleId", handleEditArticle);

module.exports = router;
