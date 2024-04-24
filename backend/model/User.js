const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  username: {
      type: String,
      required: true,
      unique:true
  },
  password: {
      type: String,
      required: true
  },
  roles: {
      User: {
          type: Number,
          default: 2001
      },
      Admin: Number
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  refreshToken: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model('Users', usersSchema);