const express = require('express');
const controller = require('../Controllers/controller');
const upload = require('../middleware/upload');

const router = express.Router();

// ✅ THIS IS THE ROUTE YOUR FRONTEND CALLS
router.post(
  '/Profile',
  upload.single('image'),
  controller.generateQR
);

// (optional – keep if you need CRUD later)
router.get('/Profile/:id', controller.getProfile);
router.put('/Profile/:id', controller.updateProfile);
router.delete('/Profile/:id', controller.deleteProfile);

module.exports = router;