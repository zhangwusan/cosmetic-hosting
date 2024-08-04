import connectToMongoDB from "@/libs/connectDB";
import User, { UserType } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: {
    params: { id: string }
}) {
    try {
        const { id } = params;
        const response = await User.findByIdAndDelete(id);
        if (!response) {
            return NextResponse.json("User not found")
        }
        return NextResponse.json("User has been deleted.")

    } catch (err) {
        return NextResponse.json("Server error: " + err)
    }

}

export async function GET(req: NextRequest, { params }: {
    params: { id: string }
}) {
    try {
        const id = params.id;
        await connectToMongoDB();
        const userDoc = await User.findById(id).exec();
        if (!userDoc) {
            return NextResponse.json("User not found")
        }
        return NextResponse.json({
            user: userDoc
        })
    } catch (error) {
        return NextResponse.json("Server error: " + error)
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const formData = await req.formData();
        const userUpdate: any = {}
        for (let [key, value] of Array.from(formData.entries())) {
            if(value !== 'undefined'){
                userUpdate[key] = value;
            }
        }

        await connectToMongoDB();
        const updatedUser = await User.findByIdAndUpdate(id, userUpdate, { new: true });

        if (!updatedUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json("updated");
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}