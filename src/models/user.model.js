import mongoose from 'mongoose';


const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ["credit", "debit", "reward"], required: true },
  amount: { type: Number, required: true },
  description: String,
  createdAt: { type: Date, default: Date.now }
});


const kycSchema = new mongoose.Schema({
  documentType: { type: String, enum: ["aadhaar", "passport", "driving_license"] },
  documentUrl: String,
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  verifiedAt: Date
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["engineer", "admin", "customer", "counter_staff"], default: "customer" },
  shopId: { type: Object },
  active: { type: Boolean, default: true },
  deleted: { type: Boolean, default: false },
  kyc: kycSchema,
  wallet: {
    balance: { type: Number, default: 0 },
    currency: { type: String, default: "INR" }
  },
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