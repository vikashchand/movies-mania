// FileLog.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileLogSchema = new Schema({
  uploader: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Assuming Customer is the model for your users
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  location: {
    type: String
    // Add any other details you want to store about the location
  }
});

const FileLog = mongoose.model('FileLog', fileLogSchema);

module.exports = FileLog;
