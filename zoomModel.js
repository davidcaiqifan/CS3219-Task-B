// zoomModel.js
var mongoose = require('mongoose');
// Setup schema
var zoomSchema = mongoose.Schema({
    classname: {
        type: String,
        required: true
    },
    zoomlink: {
        type: String,
        required: true
    },
    profemail: {
        type: String,
    },
    day: {
        type: String
    },
    time: {
        type: String
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export zoom model
var Zoom = module.exports = mongoose.model('zoom', zoomSchema);
module.exports.get = function (callback, limit) {
    Zoom.find(callback).limit(limit);
}