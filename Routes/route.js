const express = require('express');
const controller = require('../Controllers/controller');
const upload = require('../middleware/upload');

const router = express.Router();

// ✅ THIS IS THE ROUTE YOUR FRONTEND CALLS
router.post(
  '/profile',
  upload.single('image'),
  controller.generateQR
);

// (optional – keep if you need CRUD later)
router.get('/profile/:id', controller.getProfile);
router.put('/profile/:id', controller.updateProfile);
router.delete('/profile/:id', controller.deleteProfile);

module.exports = router;