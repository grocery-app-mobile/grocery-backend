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
        enum: [
            "order_incoming_transit",
            "order_received",
            "awaiting_response",
            "engineer_diagnosing",
            "awaiting_customer_price_approval",
            "price_approved",
            "repairing",
            "awaiting_quality_check",
            "quality_checking",
            "quality_checked",
            "packaging",
            "order_dispatched",
            "order_sent"
        ],
        default: "order_incoming_transit"
    },
    quote: {
        description: { type: String },
        approvedAt: Date,
        approved: { type: Boolean, default: false }
    },
    rackId: { type: mongoose.Schema.Types.ObjectId, ref: "Rack" },
    engineerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    qcEngineerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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