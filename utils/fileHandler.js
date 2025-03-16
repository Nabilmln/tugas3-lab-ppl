const fs = require("fs").promises;
const path = require("path");

const FILE_PATH = path.join(__dirname, "../database/db_books.json");

const readDatabase = async () => {
    try {
        const data = await fs.readFile(FILE_PATH, "utf8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const writeDatabase = async (books) => {
    await fs.writeFile(FILE_PATH, JSON.stringify(books, null, 2), "utf8");
};

module.exports = { readDatabase, writeDatabase };
