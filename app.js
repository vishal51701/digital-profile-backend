require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./Routes/route');

const app = express();
const port = process.env.PORT || 3000;

// ✅ MIDDLEWARE FIRST
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ ROUTES
app.use('/api', router);
app.use('/uploads', express.static('uploads'));

// ✅ DB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ SERVER
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
