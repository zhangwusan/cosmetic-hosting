import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";

const ProductSchema: Schema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    }
}, { _id: false });

export interface UserType extends Document {
    _id?: string;
    name: string;
    email: string;
    password: string;
    image?: string;
    admin: boolean;
    phone?: string;
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    products?: Array<{ id: ObjectId, quantity: number }>;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    admin: {
        type: Boolean,
        default: false,
        required: true
    },
    phone: {
        type: String,
    },
    street: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    postalCode: {
        type: String,
    },
    country: {
        type: String,
    },
    products: [ProductSchema]
}, { timestamps: true });

const User: Model<UserType> = mongoose.models.User || mongoose.model<UserType>('User', UserSchema);

export default User;
