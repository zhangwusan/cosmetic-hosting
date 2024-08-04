import connectToMongoDB from "@/libs/connectDB";
import Supplier from "@/models/Supplier";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = params;
    try {
        await connectToMongoDB();
        const deletedSupplier = await Supplier.findByIdAndDelete(id).exec();
        if (!deletedSupplier) {
            throw new Error("Supplier not found");
        }
        return NextResponse.json({ message: "Supplier deleted", id });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error!" }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = params;
    try {
        const data = await request.json();
        await connectToMongoDB();
        const updatedSupplier = await Supplier.findByIdAndUpdate(id, data, { new: true }).exec();
        if (!updatedSupplier) {
            throw new Error("Supplier not found");
        }
        return NextResponse.json({ message: "Supplier has been updated.", status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error!" }, { status: 500 });
    }
}
