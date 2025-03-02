import { Schema, model, models } from "mongoose";

const CustomerSchema = new Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true },
    serviceType: {
        type: String, required: true,
        enum: ["buyProperty", "interiorDesign", "sellProperty"],
        default: "buyProperty"
    },
}, { timestamps: true })

const CustomerModel = models.customer_db || model("customer_db", CustomerSchema)

export default CustomerModel