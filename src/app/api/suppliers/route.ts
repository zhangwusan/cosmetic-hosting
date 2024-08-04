import Supplier from "@/models/Supplier";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json(); // Parse the request body
        const newSupplier = new Supplier(data);
        const response = await newSupplier.save(); // Save the new supplier to the database
        if (!response) {
            throw new Error("Failed to save supplier");
        }
        return NextResponse.json({ message: "Supplier has been created", supplier : newSupplier });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error!" }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const suppliers = await Supplier.find({}).exec();
        return NextResponse.json(suppliers);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error!" }, { status: 500 });
    }
}