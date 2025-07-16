// register checkins
const express = require('express');
const router = express.Router();

// @route GET api/checkins
// @desc test router
// @access Public
router.get('/', (req, res) => res.send('checkin route'));

module.exports = router;