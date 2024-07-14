// backend/routes/macroRoutes.js
const express = require('express');
const router = express.Router();
const macroController = require('../controllers/macroController');

router.post('/upload', macroController.uploadMacro);
router.get('/', macroController.getMacros);

module.exports = router;
