// register habits
const express = require('express');
const router = express.Router();

// @route GET api/habits
// @desc test router
// @access Public
router.get('/', (req, res) => res.send('habits route'));

module.exports = router;