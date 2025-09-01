import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    device: {type:String,default:""},
    quote: { type: Number },   
    status: {
        type: String,
        enum: ["requested", "quoted", "approved", "paid"],
        default: "requested"
    },
    paymentId: {type:String},
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    createdAt: { type: Number },
    updatedAt: { type: Number },
}, {
    versionKey: false,
    strict: false,
    collection: 'buybacks'
});

schema.pre('save', function (next) {
    const currentTimestamp = Date.now();

    if (this.isNew) {
        this.createdAt = currentTimestamp;
    }

    this.updatedAt = currentTimestamp;

    next();
});

export default mongoose.model('Buyback', schema);