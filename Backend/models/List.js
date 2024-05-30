// models/List.js
const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    userEmail: {
      type: String,
      required: true
    },
    isPrivate: {
      type: Boolean,
      default: true
    },
    movies: [{
      title: {
        type: String,
        required: true
      },
      year: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      }
    }]
  });
  

module.exports = mongoose.model('List', listSchema);
