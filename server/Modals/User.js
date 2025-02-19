import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  refresh_token: {
    type: String,
    default: "",
  },
  generated_token: {
    type: String, 
    default: "",
  },
  access_token: {
    type: String, 
    default: "",
  },
});

const User = mongoose.model('User', userSchema);

export default User;
