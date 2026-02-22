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
    default: 'pending' // All new courses require admin approval
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
  keywords: {
    type: [String], // Array of strings for better searchability later
    default: []
  },
  contentUrls: {
    type: [String], // Array of links (PDFs, videos hosted elsewhere)
    required: [true, 'Please provide at least one content URL']
  }
}, { timestamps: true });

// Create text indexes so students can easily search by keywords, title, or description
courseSchema.index({ title: 'text', description: 'text', keywords: 'text' });

module.exports = mongoose.model('Course', courseSchema);