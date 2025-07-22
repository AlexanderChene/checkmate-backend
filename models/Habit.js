const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    frequency:{
        type: String,
        enum: ['daily', 'weekly', 'custom'],
        required: true,
    },
    targetCount: {
        type: Number,
        required: true,
    },
    active:{
        type: Boolean,
        default: true,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = Habit = mongoose.model('habit', HabitSchema);