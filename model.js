const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const buttonSchema = new Schema({
  buttons: [Number],
  size: { required: true, type: Number },
});
const model = mongoose.model('Button', buttonSchema);
module.exports = model;
