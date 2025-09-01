import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    engineerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    device: {
        type: String,
        required: true
    },
    issue: {
        type: String,
        required: true
    },
    scheduledAt: { type: Number },
    status: {
        type: String,
        enum: ["pending", "assigned", "completed", "cancelled"],
        default: "pending"
    },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    createdAt: { type: Number },
    updatedAt: { type: Number },
}, {
    versionKey: false,
    strict: false,
    collection: 'appointments'
});

schema.pre('save', function (next) {
    const currentTimestamp = Date.now();

    if (this.isNew) {
        this.createdAt = currentTimestamp;
    }

    this.updatedAt = currentTimestamp;

    next();
});

export default mongoose.model('Appointment', schema);