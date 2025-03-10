import { Schema, model, models, Types } from "mongoose";

const PropertySchema = new Schema({
    _id: { type: Types.ObjectId, auto: true },  // ✅ Explicitly define _id
    title: { type: String, required: true },
    images: { type: [String], required: true },
    price: { type: String, required: true },
    propertyType: { type: String, required: true },
    configuration: { type: [String], required: true },
    configurations: [
        {
            bhkType: { type: String, required: true },             // e.g., "1 BHK"
            carpetArea: { type: String, required: true },          // e.g., "338"
            carpetAreaUnit: { type: String, default: "Sq.ft" },    // New: Unit for carpet area (default to "Sq.ft")
            builtupArea: { type: String, default: "On Request" },  // e.g., "On Request"
            builtupAreaUnit: { type: String, default: "Sq.ft" },   // New: Unit for built-up area (default to "Sq.ft")
            price: { type: String, required: true }                // e.g., "2600000" (store as a string but only numbers)
        }
    ],
    description: { type: String, required: true },
    location: { type: String, required: true },
    address: {
        city: { type: String },
        state: { type: String },
    },
    area: { type: String, required: true },
    areaUnit: { type: String, required: true },
    yearBuilt: { type: Number, required: true },
    features: { type: [String] },
    recommend: { type: Boolean, default: false },
    possession: { type: String, required: true },
    possessionDate: { type: String, default: "To be announced" },  // 🔥 New: String for possession date
    developer: { type: String, required: true },
    url: { type: String, required: true },
    featured: { type: Boolean, default: false },
    newProperty: { type: Boolean, default: false },
}, 
    { timestamps: true, versionKey: false }
);

const PropertyModel = models.property_db || model("property_db", PropertySchema);

export default PropertyModel;
