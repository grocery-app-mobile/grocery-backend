import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    subject: String,
    description: String,
    status: {
        type: String,
        enum: ["open", "in_progress", "resolved", "closed"],
        default: "open"
    },
    slaExpiresAt: Date,
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    createdAt: { type: Number },
    updatedAt: { type: Number },
}, {
    versionKey: false,
    strict: false,
    collection: 'tickets'
});

schema.pre('save', function (next) {
    const currentTimestamp = Date.now();

    if (this.isNew) {
        this.createdAt = currentTimestamp;
    }

    this.updatedAt = currentTimestamp;

    next();
});

export default mongoose.model('Ticket', schema);