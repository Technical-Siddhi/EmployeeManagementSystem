const mongoose = require('mongoose');

const ticketCommentSchema = new mongoose.Schema({
  ticketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket',
    required: true
  },
  authorName: {
    type: String,
    required: true,
    default: 'Support Agent'
  },
  authorRole: {
    type: String,
    default: 'admin'
  },
  text: {
    type: String,
    required: true
  },
  attachments: [{
    fileName: String,
    fileUrl: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('TicketComment', ticketCommentSchema);
