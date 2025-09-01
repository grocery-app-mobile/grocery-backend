import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    orderType: { type: String, enum: ["repair", "buyback"] },
    orderId: { type: mongoose.Schema.Types.ObjectId }, 
    amount: Number,
    status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
    payment: {
        provider: String,  
        paymentId: String,
        paidAt: Date
    },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    createdAt: { type: Number },
    updatedAt: { type: Number },
}, {
    versionKey: false,
    strict: false,
    collection: 'invoices'
});

schema.pre('save', function (next) {
    const currentTimestamp = Date.now();

    if (this.isNew) {
        this.createdAt = currentTimestamp;
    }

    this.updatedAt = currentTimestamp;

    next();
});

export default mongoose.model('Invoice', schema);