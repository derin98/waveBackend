const mongoose = require("mongoose");

const { constants: { organizationManagementConstants: { organizationConstants: { subscriptionType } } } } = require("../../utils");

const organizationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    subscription: {
        type: { type: String, required: true, enum: Object.keys(subscriptionType) },
        startDate: { type: Date, default: Date.now },
        endDate: { type: Date, default: Date.now },
        renewalDate: { type: Date, default: Date.now },
        isBlocked: { type: Boolean, default: false },
    },
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
    },
    updatedBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

organizationSchema.virtual('id').get(function () {
    return this._id.toHexString();
});


organizationSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
    }
});


const Organizations = mongoose.model("Organization", organizationSchema, "organizations");
module.exports = { Organizations };