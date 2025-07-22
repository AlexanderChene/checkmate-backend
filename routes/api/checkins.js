// register checkins
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Checkin = require('../../models/Checkin');


// @route POST api/checkins/habit/:habit_id
// @desc post a checkin for a specific habit
// @access Private
router.post('/habit/:habit_id', auth, async (req, res) => {
    try {
        const newCheckin = new Checkin({
            user: req.user.id,
            habit: req.params.habit_id,
            timestamp: Date.now()
        });

        const checkin = await newCheckin.save();
        res.json(checkin);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



// @route GET api/checkins/habit/:habit_id
// @desc get all checkins for a specific habit
// @access Private
router.get('/habit/:habit_id',auth, async (req, res) => {
    try {
        const checkins = await Checkin.find({ habit: req.params.habit_id, user: req.user.id })
            .populate('user', ['name', 'avatar'])
            .sort({ timestamp: -1 });

        res.json(checkins);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Habit not found' });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;