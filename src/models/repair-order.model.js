import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    device: {
        type: String,
        required: true
    },
    issue: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["intake", "diagnosis", "quote_sent", "approved", "repairing", "qc", "dispatched"],
        default: "intake"
    },
    quote: {
        amount: Number,
        approved: { type: Boolean, default: false },
        approvedAt: Date
    },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    createdAt: { type: Number },
    updatedAt: { type: Number },
}, {
    versionKey: false,
    strict: false,
    collection: 'repairOrders'
});

schema.pre('save', function (next) {
    const currentTimestamp = Date.now();

    if (this.isNew) {
        this.createdAt = currentTimestamp;
    }

    this.updatedAt = currentTimestamp;

    next();
});

export default mongoose.model('RepairOrder', schema);