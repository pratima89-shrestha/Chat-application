const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5-koyOCa1_xg_7pJp8GB5nVlV_G-79Ow-hw&s',
    },
  },
  {
    timestamps: true,
  }
);

// Compare entered password with the hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Before saving, hash the password if it has been modified
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {  // Check if the password is modified
    return next();  // If not modified, move to the next middleware
  }

  // If password is modified, hash it before saving
  const salt = await bcrypt.genSalt(10);  // More rounds make it stronger, but slower
  this.password = await bcrypt.hash(this.password, salt);  // Hash the password
  next();  // Continue saving the user
});

const User = mongoose.model('User', userSchema);

module.exports = User;
