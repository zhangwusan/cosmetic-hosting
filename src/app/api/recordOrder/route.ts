import RecordOrder from "@/models/RecordOrder";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const records = await RecordOrder.find();
        return NextResponse.json(records, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Server error: " + (error as Error).message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const newRecordOrder = new RecordOrder({
            customer_id: data.customer_id,
            products: data.products,
            total_price: data.total_price,
            status: data.status,
            delivery_address: data.delivery_address,
            delivery_date: data.delivery_date,
        });
        const response = await newRecordOrder.save();
        if (!response) {
            throw new Error("Failed to save data");
        }
        return NextResponse.json({ message: "Data saved successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Server error: " + (error as Error).message }, { status: 500 });
    }
}