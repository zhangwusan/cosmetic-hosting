import mongoose, { Model, Schema, Document, ObjectId } from "mongoose";

export interface ProductType extends Document {
    name: string;
    category: string;
    brand: string;
    price: number;
    images_url: string[];
    stock: number;
    discount: number;
    description: string;
    rating: number;
    supplier: ObjectId;
    quantity?: number;
}

const ProductSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
    },
    brand: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    images_url: {
        type: [String],
    },
    stock: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    discount: {
        type: Number,
    },
    rating: {
        type: Number,
        default: 0,
    },
    quantity: {
        type: Number,
        default: 0,
    },
    ingredients: [{
        type: Schema.Types.ObjectId,
        ref: 'Ingredient',
    }],
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'Supplier',
    },
}, {
    timestamps: true,
});

const Product: Model<ProductType> = mongoose.models.Product || mongoose.model<ProductType>('Product', ProductSchema);

export default Product;
