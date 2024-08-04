import mongoose, { Model, Schema, Document, ObjectId } from "mongoose";


export interface SupplierType extends Document {
    name: string;
    contact_name: string;
    phone_number: string;
    email: string;
    address: string;
    city: string;
    state: string;
    postal_code: string;
    zip_code: string;
    country: string;
    products: ObjectId[];
}

const SupplierSchema: Schema = new Schema<SupplierType>({
    name: {
        type: String,
        required: true
    },
    contact_name: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    postal_code: {
        type: String,
        required: true
    },
    zip_code: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    // products: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Product'
    // }]
}, {
    timestamps: true,
})

const Supplier: Model<SupplierType> = mongoose.models.Supplier || mongoose.model('Supplier', SupplierSchema)

export default Supplier;


