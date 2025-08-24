import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true, required: true },
    productName: { type: String, default: "" },
    productId: { type: String, default: "" },
    status: { type: String, default: "" },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true, required: true },
    amount: { type: Number, required: true, min: 0 },
    active: { type: Boolean, default: true },   
    deleted: { type: Boolean, default: false },
    createdAt: { type: Number },
    updatedAt: { type: Number },
}, {
    versionKey: false,
    strict: false,
    collection: 'orders'
});

schema.pre('save', function (next) {
    const currentTimestamp = Date.now();

    if (this.isNew) {
        this.createdAt = currentTimestamp;
    }

    this.updatedAt = currentTimestamp;

    next();
});

export default mongoose.model('Order', orderSchema);