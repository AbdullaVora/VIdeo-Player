const mongoose = require('mongoose');

const videoProgressSchema = new mongoose.Schema({
    totalPlayVideo: {
        type: Number,
    },
    lastWatchedTime: {
        type: Number,
    }
});

const Videomodel = mongoose.model('Videomodel', videoProgressSchema);

module.exports = Videomodel;
