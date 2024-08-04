import mongoose, { Document, Schema } from "mongoose";


export interface RecordOrderType extends Document {
    customer_id: string;
    products: {
        product_id: string;
        unit_price: number;
        quantity: number;
    }[];
    total_price: number;
    status: string;
    delivery_address: {
        street: string;
        city: string;
        state: string;
        zip_code: string;
    };
    delivery_date: {
        start_date: string;
        end_date: string;
        note: string;
    }
}


const RecordOrderSchema = new Schema({
    customer_id: {
        type: String,
        required: true,
    },
    products: [
        {
            product_id: {
                type: String,
                required: true,
            },
            unit_price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    total_price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    delivery_address: {
        street: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        zip_code: {
            type: String,
            required: true,
        },
    },
    delivery_date: {
        start_date: {
            type: String,
            required: true,
        },
        end_date: {
            type: String,
            required: true,
        },
        note: {
            type: String,
        },
    },
}, { timestamps: true });

const RecordOrder = mongoose.models.RecordOrder || mongoose.model('RecordOrder', RecordOrderSchema);

export default RecordOrder;