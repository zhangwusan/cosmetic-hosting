import RecordOrder from "@/models/RecordOrder";
import { AnyError } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { recordId: string } }) {
    try {
        const { recordId } = params;
        const response = await RecordOrder.findByIdAndDelete(recordId);
        if (!response) {
            return NextResponse.json({ error: "Record not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Record deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error deleting record: " + (error as Error).message }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { recordId: string } }) {
    try {
        const { recordId } = params;
        const dataUpdateRecord = await req.json();
        const updatedRecord = await RecordOrder.findByIdAndUpdate(recordId, dataUpdateRecord, { new: true });
        if (!updatedRecord) {
            return NextResponse.json({ error: "Record not found" }, { status: 404 });
        }
        return NextResponse.json(updatedRecord, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error updating record: " + (error as Error).message }, { status: 500 });
    }
}