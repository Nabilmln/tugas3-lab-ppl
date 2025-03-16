const { readDatabase, writeDatabase } = require("../utils/fileHandler");

// GET semua buku
const getAllBooks = async (req, res) => {
  const books = await readDatabase();
  res.json({ data: books });
};

// GET satu buku berdasarkan ID
const getBookById = async (req, res) => {
  const books = await readDatabase();
  const book = books.find((b) => b.id === parseInt(req.params.id));

  if (!book) return res.status(404).json({ message: "Buku tidak ditemukan!" });

  res.json(book);
};

// GET buku berdasarkan nama (pencarian parsial)
const getBookByTitle = async (req, res) => {
  const books = await readDatabase();
  const title = req.params.title.toLowerCase();

  // Filter buku yang judulnya mengandung kata kunci (case-insensitive)
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(title)
  );

  if (filteredBooks.length === 0) {
    return res
      .status(404)
      .json({
        error: `Buku dengan judul mengandung "${title}" tidak ditemukan.`,
      });
  }

  res.json({ data: filteredBooks });
};

// POST tambah buku baru
const addBook = async (req, res) => {
  const { title, author, year, publisher, genre, pages, isbn, status } =
    req.body;

  if (!title || !author || !year) {
    return res
      .status(400)
      .json({ message: "Judul, penulis, dan tahun wajib diisi!" });
  }

  const books = await readDatabase();
  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author,
    year,
    publisher,
    genre,
    pages,
    isbn,
    status: status || "Tersedia",
  };

  books.push(newBook);
  await writeDatabase(books);
  res
    .status(201)
    .json({ message: "Buku berhasil ditambahkan!", book: newBook });
};

// PUT update buku
const updateBook = async (req, res) => {
  const { id } = req.params;
  const books = await readDatabase();
  const index = books.findIndex((b) => b.id === parseInt(id));

  if (index === -1)
    return res.status(404).json({ message: "Buku tidak ditemukan!" });

  books[index] = { ...books[index], ...req.body };
  await writeDatabase(books);
  res.json({ message: "Buku berhasil diperbarui!", book: books[index] });
};

// DELETE hapus buku
const deleteBook = async (req, res) => {
  const { id } = req.params;
  let books = await readDatabase();
  books = books.filter((b) => b.id !== parseInt(id));

  await writeDatabase(books);
  res.json({ message: "Buku berhasil dihapus!" });
};

module.exports = {
  getAllBooks,
  getBookById,
  getBookByTitle,
  addBook,
  updateBook,
  deleteBook,
};
