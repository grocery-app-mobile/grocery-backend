import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true, required: true },
    productName: { type: String, default: "" },
    productImage: { type: String, default: "" },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    stockQuantity: { type: Number, required: true, min: 0 },
    active: { type: Boolean, default: true },   
    deleted: { type: Boolean, default: false },
    createdAt: { type: Number },
    updatedAt: { type: Number },
}, {
    versionKey: false,
    strict: false,
    collection: 'products'
});

schema.pre('save', function (next) {
    const currentTimestamp = Date.now();

    if (this.isNew) {
        this.createdAt = currentTimestamp;
    }

    this.updatedAt = currentTimestamp;

    next();
});

export default mongoose.model('Product', schema);