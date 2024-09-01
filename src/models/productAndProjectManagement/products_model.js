const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    version: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    updatedBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    }
});

productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});


productSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
    }
});


const Products = mongoose.model("Product", productSchema, "products");
module.exports = { Products };





