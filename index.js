const express = require("express");
const app = express();
const cors = require('cors');
const cloudinary = require('cloudinary');
const port = 3000;

require("dotenv").config();

app.use(cors())

app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use((req, res) => {
  const err = new Error("Not Found");
  err.status = 404;
  return res.status(404).json({
    status: false,
    message: err.message
  });
});

app.use((err, req, res) => {
  res.status(err.status || 500);
  return res.status(500).json({
    status: false,
    message: err.message
  });
});

app.listen(port, () => console.log(`Service is running on port - ${port}`));