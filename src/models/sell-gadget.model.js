import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    product: {
        type: String,
        default: ""
    },
    modelName: {
        type: String,
        default: ""
    },
    serialNumber: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: ["requested"],
        default: "requested"
    },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    createdAt: { type: Number },
    updatedAt: { type: Number },
}, {
    versionKey: false,
    strict: false,
    collection: 'sellGadgets'
});

schema.pre('save', function (next) {
    const currentTimestamp = Date.now();

    if (this.isNew) {
        this.createdAt = currentTimestamp;
    }

    this.updatedAt = currentTimestamp;

    next();
});

export default mongoose.model('SellGadget', schema);