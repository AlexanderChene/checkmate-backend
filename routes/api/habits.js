// register habits
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Habit = require('../../models/Habit');
const User = require('../../models/User');
const { check, validationResult} = require('express-validator');


// @route get api/habits/user/:user_id
// @desc get habits from one user
// @access Public
router.get('/user/:user_id', async (req, res) => {
    try{
        const habits = await Habit.find({ user: req.params.user_id}).populate('user', ['name', 'avatar']);

        res.json(habits);

    } catch(err){
        console.error(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({ msg: 'user not found' });
        }
        res.status(500).send('Server Error');

    }
});

// @route POST api/habits
// @desc create one user habit
// @access Private
router.post('/', [auth, [
    check('name', 'name is required').not().isEmpty(),
    check('frequency', 'frequency is required').not().isEmpty(),
    check('targetCount', 'targetCount is required').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {name, description, frequency, targetCount, active, crearedAt} = req.body;
    console.log(req.body);
    const habitFields = {}
    habitFields.user = req.user.id;
    if(name) habitFields.name = name;
    if(description) habitFields.description = description;
    if(frequency) habitFields.frequency = frequency;
    if(targetCount) habitFields.targetCount= targetCount;
    if(active) habitFields.active= active;
    if(crearedAt) habitFields.crearedAt= crearedAt;
    console.log(name);
    console.log(habitFields);
    try{
        // create
        let habit = new Habit(habitFields);

        await habit.save();
        res.json(habit);
    }catch(err){
        console.error(err);
        res.status(500).send('Server Error');

    }
})

// @route PUT /api/habits/:id
// @desc update habits
// @access private
router.put('/:habit_id', [auth, [
    check('name', 'name is required').not().isEmpty(),
    check('frequency', 'frequency is required').not().isEmpty(),
    check('targetCount', 'targetCount is required').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {name, description, frequency, targetCount, active, crearedAt} = req.body;
    console.log(req.body);
    const habitFields = {}
    habitFields.user = req.user.id;
    if(name) habitFields.name = name;
    if(description) habitFields.description = description;
    if(frequency) habitFields.frequency = frequency;
    if(targetCount) habitFields.targetCount= targetCount;
    if(active) habitFields.active= active;
    if(crearedAt) habitFields.crearedAt= crearedAt;
    console.log(name);
    console.log(habitFields);
    try{
        
        let habit = await Habit.findOne({ _id: req.params.habit_id, user: req.user.id });
        if(habit){
            // update
            habit = await Habit.findOneAndUpdate(
                {_id: req.params.habit_id, user: req.user.id }, 
                { $set: habitFields}, 
                {new: true}
            );
            return res.json(habit);
        }else{
            return res.status(404).send({msg: 'habit not found'});
        }
        
    }catch(err){
        console.error(err);
        res.status(500).send('Server Error');

    }
})

// @route DELETE api/habits/:id
// @desc delete habit
// @access private
router.delete('/:habit_id', auth, async(req, res)=>{
    try{
        // remove habit id from user
        let habit = await Habit.findOneAndDelete({_id: req.params.habit_id, user: req.user.id});
        if(!habit){
            return res.status(404).json({msg: 'Habit not found'});
        }
        res.json({msg: 'habit deleted'})
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})


module.exports = router;