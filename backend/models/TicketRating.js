const mongoose = require('mongoose');

const ticketRatingSchema = new mongoose.Schema({
  ticketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    default: ''
  },
  employeeName: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('TicketRating', ticketRatingSchema);
