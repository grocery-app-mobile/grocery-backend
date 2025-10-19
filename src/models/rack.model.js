import mongoose from 'mongoose';

const RackSchema = new mongoose.Schema(
  {
    rack_id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    total_slots: {
      type: Number,
      required: true,
      min: 1,
    },
    occupied_slots: {
      type: Number,
      default: 0,
      min: 0,
    },
    devices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Device",
      },
    ],
    last_audit_date: {
      type: Date,
      default: Date.now,
    },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    createdAt: { type: Number },
    updatedAt: { type: Number },
  },
  {
    versionKey: false,
    strict: false,
    collection: 'racks'
  }
);

RackSchema.pre('save', function (next) {
    const currentTimestamp = Date.now();

    if (this.isNew) {
      this.createdAt = currentTimestamp;
    }

    this.updatedAt = currentTimestamp;

    next();
});


export default mongoose.model("Rack", RackSchema);