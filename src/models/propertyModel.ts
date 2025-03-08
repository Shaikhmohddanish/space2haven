import { Schema, model, models, Types } from "mongoose";

const PropertySchema = new Schema({
    _id: { type: Types.ObjectId, auto: true },  // ✅ Explicitly define _id
    title: { type: String, required: true },
    images: { type: [String], required: true },
    price: { type: String, required: true },
    propertyType: { type: String, required: true },
    configuration: { type: [String], required: true },
    configurations: [  // ✅ New: Array of objects for detailed configurations
        {
            bhkType: { type: String, required: true },        // e.g., "1 BHK"
            carpetArea: { type: String, required: true },      // e.g., "338 Sq.ft"
            builtupArea: { type: String, default: "On Request" },  // e.g., "On Request"
            price: { type: String, required: true }            // e.g., "INR 26.0 Lacs"
        }
    ],
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
    possession: { type: String, required: true },
    developer: { type: String, required: true },
    url: { type: String, required: true },
    featured: { type: Boolean, default: false },
    newProperty: { type: Boolean, default: false },
}, 
    { timestamps: true, versionKey: false }  // ✅ Remove __v field for clean data
);

const PropertyModel = models.property_db || model("property_db", PropertySchema);

export default PropertyModel;
