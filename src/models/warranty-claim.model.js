import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    product: {
        type: String,
        default: ""
    },
    issue_description: {
        type: String,
        default: ""
    },
    purchase_date: {
        type: String,
        default: ""
    },
    invoice: {
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
    collection: 'warrantyClaims'
});

schema.pre('save', function (next) {
    const currentTimestamp = Date.now();

    if (this.isNew) {
        this.createdAt = currentTimestamp;
    }

    this.updatedAt = currentTimestamp;

    next();
});

export default mongoose.model('WarrantyClaim', schema);