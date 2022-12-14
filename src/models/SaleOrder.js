const mongoose = require("mongoose");
const { schemaOptions } = require("./modelOption");

const SaleOrderSchema = new mongoose.Schema(
    {
        fromOrder: {
            name: { type: String, require: true },
            address: { type: String, require: true },
            phone: { type: String, require: true },
        },
        toOrder: {
            name: { type: String, require: true },
            address: { type: String, require: true },
            phone: { type: String, require: true },
        },
        idSupplier: { type: String },
        status: { type: Number, default: 0 }, //0 tạo mới 1. đang giao 2. hoàn thành -1 đã hủy
        createdDate: { type: Date, require: true, default: new Date() },
        dueDate: { type: Date, require: true },
        products: [
            {
                name: { type: String, ref: "products" },
                price: { type: Number, require: true },
                quantity: { type: Number, require: true },
                total: { type: Number, require: true },
                category: [
                    {
                        name: { type: String },
                    },
                ],
                type: { type: String },
            },
        ],
        amount: { type: Number, default: 0 },
        total: { type: Number, default: 0 },
        description: { type: String, default: "" },
        createdBy: { type: String, ref: "Auth" },
        deliveryReal: { type: Date },
    },
    schemaOptions
);

module.exports = mongoose.model("SaleOrder", SaleOrderSchema);
