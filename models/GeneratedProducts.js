import mongoose, { model, Schema, models } from "mongoose";

const GeneratedProductSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    images: [{ type: String }],
    category: { type: String },
    properties: { type: Object },
    customId: { type: String, required: true }
}, {
    timestamps: true,
});

export const GeneratedProduct = models.GeneratedProduct || model('GeneratedProduct', GeneratedProductSchema);