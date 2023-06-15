const mongoose = require('mongoose');
const schema = mongoose.Schema;

const CampgroundSchema = new mongoose.Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,

});

module.exports = mongoose.model('Campground', CampgroundSchema);