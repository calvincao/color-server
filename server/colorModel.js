const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  colorsList: [String]
});

const Color = mongoose.model('Color', schema);
module.exports = Color;