const express = require("express");
const router = express.Router();
const { getAllBooks, getBookById, getBookByTitle, addBook, updateBook, deleteBook } = require("../controllers/booksController");

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.get("/search/:title", getBookByTitle);
router.post("/", addBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;