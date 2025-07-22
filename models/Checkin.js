const mongoose = require('mongoose');

const CheckinSchema = new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        habit: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'habit',
            required: true
        },
        timestamp:{
            type: Date,
            default: Date.now,
            required: true
        }
});

module.exports = Checkin = mongoose.model('checkin', CheckinSchema);