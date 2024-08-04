import { extractFileNameFromURL } from "@/libs/extractFileNameFromURL";
import { removeImageFromS3 } from "@/libs/uploadsToS3";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    try {
        // Fetch the product by ID
        const product = await Product.findById(id).exec();
        if (!product) {
            return NextResponse.json({ message: "Product not found", status: 404 });
        }

        // Extract image URLs and delete images from S3
        const imageUrls = product.images_url?.map(extractFileNameFromURL) || [];
        if (imageUrls.length > 0) {
            try {
                const deleteResponses = await Promise.all(imageUrls.map(removeImageFromS3));
                console.log("Images deleted from S3", deleteResponses);
            } catch (s3Error) {
                console.error("Error deleting images from S3", s3Error);
                return NextResponse.json({ message: "Error deleting images from S3", status: 500 });
            }
        }

        // Delete the product from the database
        const deletedProduct = await Product.findByIdAndDelete(id).exec();
        if (!deletedProduct) {
            throw new Error("Failed to delete the product after S3 cleanup");
        }

        return NextResponse.json({ message: "Product deleted successfully", status: 200 });
    } catch (error) {
        console.error("Internal Server Error", error);
        return NextResponse.json({ message: "Internal Server Error", status: 500 });
    }
}




export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    try {
        // get data from request 
        const product = await req.formData();

        const updatedFields = {
            name: product.get('name') as string,
            category: product.get('category') as string,
            brand: product.get('brand') as string,
            stock: product.get('stock') as string,
            discount: product.get('discount') as string,
            rating: product.get('rating') as string,
            price: product.get('price') as string,
            description: product.get('description') as string,
            supplier: product.get('supplier') as string
        };
        const newProduct = await Product.findByIdAndUpdate(id, updatedFields, { new: true })
        if (!newProduct) {
            return NextResponse.json({ message: "Product not found", status: 404 });
        }
        return NextResponse.json({ message: "Product updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Internal Server Error", error);
        return NextResponse.json({ message: "Internal Server Error", status: 500 });
    }
}

export async function GET(req: NextRequest, {
    params
} : { 
    params: { id: string }
}) {
    const { id } = params;

    try {
        const product = await Product.findById(id).exec();
        if (!product) {
            return NextResponse.json({ message: "Product not found", status: 404 });
        }
        return NextResponse.json(product);
    } catch (error) {
        console.error("Internal Server Error", error);
        return NextResponse.json({ message: "Internal Server Error", status: 500 });
    }
}