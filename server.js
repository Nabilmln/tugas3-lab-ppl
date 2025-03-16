const express = require("express");
const cors = require("cors");
const booksRoutes = require("./routes/routes");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/books", booksRoutes);

app.get("/", (req, res) => {
    res.send("📚 API Buku!");
});

app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
