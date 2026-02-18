require('dotenv').config();   // Always keep this at top

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./Routes/route');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());
app.use(router);
app.use('/uploads', express.static('uploads'));


// Use .env variable instead of hardcoding
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

