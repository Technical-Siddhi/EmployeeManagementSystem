const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: function() { return this.provider === 'local'; },
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['admin', 'hr', 'employee'],
    default: 'employee',
  },
  name: {
    type: String,
    required: true,
  },
  department: String,
  googleId: String,
  facebookId: String,
  instagramId: String,
  provider: {
    type: String,
    enum: ['local', 'google', 'facebook', 'instagram'],
    default: 'local',
  },
  avatar: String,
  emailVerified: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

