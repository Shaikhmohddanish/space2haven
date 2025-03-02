import { Schema, model, models } from "mongoose";

const DeletedProperiesSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    images: { type: [String], required: true },
    price: { type: String, required: true },
    propertyType: { type: String, required: true },
    configuration: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    address: {
        city: { type: String },
        state: { type: String },
    },
    area: { type: String, required: true },
    yearBuilt: { type: Number, required: true },
    features: { type: [String] },
    recommend: { type: Boolean, default: false },
    deletedAt: { type: Date, default: Date.now }
});

const DeletedPropertiesModel = models.property_db || model("deleted_properties_db", DeletedProperiesSchema)

export default DeletedPropertiesModel