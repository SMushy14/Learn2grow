const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a course title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  subject: {
    type: String,
    required: [true, 'Please specify the subject (e.g., Math, Science)']
  },
  language: {
    type: String,
    required: [true, 'Please specify the language (e.g., English, Kinyarwanda, French)'],
    default: 'English'
  },
  contentUrls: {
    type: [String],
    required: [true, 'Please provide at least one content URL']
  }
}, { timestamps: true });

// Updated text index (removed keywords) for searchability
courseSchema.index({ title: 'text', description: 'text', subject: 'text' });

module.exports = mongoose.model('Course', courseSchema);