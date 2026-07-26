const mongoose = require('mongoose');

const documentCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, default: '' },
  isCustom: { type: Boolean, default: true },
  createdBy: {
    id: String,
    name: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('DocumentCategory', documentCategorySchema);
