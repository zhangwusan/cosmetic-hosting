import User from "@/models/User";
import mongoose, { ObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

// Handle GET request to fetch the user's cart
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
        }
        const user = await User.findById(userId).exec();
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ cart: user.products });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error!", error: error }, { status: 500 });
    }
}

// Handle POST request to add a product to the user's cart
export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        const { userId, productCart } = data;

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
        }

        if (!productCart._id || !mongoose.Types.ObjectId.isValid(productCart._id)) {
            return NextResponse.json({ message: "Invalid product ID" }, { status: 400 });
        }

        const user = await User.findById(userId).exec();
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const existingProduct = user.products?.find(p => p.id.toString() === productCart._id);
        if (existingProduct) {
            return NextResponse.json({ message: "Product already in cart" }, { status: 400 });
        }

        const productIdObject = productCart._id.toString();

        user.products?.push({ id: productIdObject, quantity: productCart.quantity || 1 });
        await user.save();

        return NextResponse.json({ message: "Product added to cart", productCart });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error!", error: error }, { status: 500 });
    }
}

// Handle DELETE request to remove a product from the user's cart
export async function DELETE(req: NextRequest) {
    try {
        const data = await req.json();
        const { userId, productId } = data;

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
        }
        if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
            return NextResponse.json({ message: "Invalid product ID" }, { status: 400 });
        }

        await User.findByIdAndUpdate(userId, { $pull: { products: { id: productId } } }).exec();

        return NextResponse.json({ message: "Product removed from cart", productId });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error!", error: error }, { status: 500 });
    }
}
