const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    
    title: {
        type: String,
        required: true
    },
    eventType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }

})

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;