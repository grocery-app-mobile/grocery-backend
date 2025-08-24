import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["SHOP_OWNER", "ADMIN", "CUSTOMER"] },
  shopId: { type: Object },
  active: { type: Boolean, default: true },
  deleted: { type: Boolean, default: false },
  createdAt: { type: Number },
  updatedAt: { type: Number },
}, {
  versionKey: false,
  strict: false,
  collection: 'users'
});

userSchema.pre('save', function (next) {
  const currentTimestamp = Date.now();

  if (this.isNew) {
    this.createdAt = currentTimestamp;
  }

  this.updatedAt = currentTimestamp;

  next();
});

export default mongoose.model('User', userSchema);