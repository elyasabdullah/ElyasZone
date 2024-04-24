const mongoose = require('mongoose');
const { Schema } = mongoose;

const servicesSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  userId: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    maxlength: 30
  },
  contactInfo: {
    type: String,
    maxlength: 300,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Services', servicesSchema);