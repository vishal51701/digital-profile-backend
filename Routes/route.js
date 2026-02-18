const express = require('express');
const controller = require('../Controllers/controller');
const upload = require('../middleware/upload');

const router = express.Router();

// ✅ CLEAN multer usage
router.post(
    '/generate-qr',
    upload.single('image'),
    controller.generateQR
);

router.get('/profile/:id', controller.getProfile);
router.put('/profile/:id', controller.updateProfile);
router.delete('/profile/:id', controller.deleteProfile);

module.exports = router;
