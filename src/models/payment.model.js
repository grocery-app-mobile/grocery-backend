import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    amount: { type: Number, required: true, min: 0 },
    method: { type: String, default: "" },
    type: { type: String, default: "" },
    refNo: { type: String, default: "" },
    receivedBy: { type: String, default: "" },
    active: { type: Boolean, default: true },   
    deleted: { type: Boolean, default: false },
    createdAt: { type: Number },
    updatedAt: { type: Number }
}, {
    versionKey: false,
    strict: false,
    collection: 'payments'
});

schema.pre('save', function (next) {
    const currentTimestamp = Date.now();

    if (this.isNew) {
        this.createdAt = currentTimestamp;
    }

    this.updatedAt = currentTimestamp;

    next();
});

export default mongoose.model('Payment', paymentSchema);