import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PUT(req: NextRequest, { params }: { params: { userId: string } }) {
    const { userId } = params;

    try {
        // get data from request 
        const { productId, quantity } = await req.json();
        
        // Ensure productId and quantity are provided
        if (!productId || !quantity) {
            return NextResponse.json({ message: "ProductId and quantity are required" }, { status: 400 });
        }

        // Convert quantity to a number
        const quantityNumber = Number(quantity);
        if (isNaN(quantityNumber) || quantityNumber < 0) {
            return NextResponse.json({ message: "Quantity must be a non-negative number" }, { status: 400 });
        }

        // get user by id
        const user = await User.findById(userId).select('products').exec();

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // find product index in user's cart
        const productIndex = user?.products?.findIndex((product) => product.id.toString() === productId.toString());

        if (productIndex === -1) {
            return NextResponse.json({ message: "Product not found in user's cart" }, { status: 404 });
        }

        if (user?.products && productIndex) {
            user.products[productIndex].quantity = quantityNumber;

        }

        // save the updated user document
        await user.save();

        return NextResponse.json({ message: "Product quantity updated successfully" });
    } catch (error) {
        return NextResponse.json({ message: "Error updating user", error: error }, { status: 500 });
    }
}
