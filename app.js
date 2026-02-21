require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./Routes/route');

const app = express();

// ✅ CORS (FIXED)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ BODY PARSERS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ ROUTES
app.use('/api', router);
app.use('/uploads', express.static('uploads'));

// ✅ DB CONNECTION (important for Vercel cold start)
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URL);
  isConnected = true;
  console.log("MongoDB Connected");
}
connectDB().catch(err => console.log(err));

// ❌ REMOVE app.listen()
// ✅ EXPORT FOR VERCEL
module.exports = app;