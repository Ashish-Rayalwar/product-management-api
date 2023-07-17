const fs = require("fs");
const path = require("path");
const multer = require("multer");
const database = path.join(__dirname, "../products.json");
const public = path.join(__dirname, "../images");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, public);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

const getData = () => {
  try {
    if (fs.existsSync(database)) {
      const rawData = fs.readFileSync(database);
      return JSON.parse(rawData);
    } else {
      return []; // Return an empty array if the file doesn't exist
    }
  } catch (error) {
    console.error("Error reading or parsing JSON file:", error);
    throw error;
  }
};

// const emptyData = () => {
//   fs.writeFileSync(database, []);
// };

const createData = (newData) => {
  try {
    let existingData = getData();

    if (!Array.isArray(existingData)) {
      existingData = [];
    }

    existingData = existingData.concat(newData);
    const jsonData = JSON.stringify(existingData);
    fs.writeFileSync(database, jsonData);
  } catch (error) {
    console.error("Error writing data to JSON file:", error);
    throw error;
  }
};

module.exports = { getData, createData, upload };
