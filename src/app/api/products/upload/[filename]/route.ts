import { extractFileNameFromURL } from "@/libs/extractFileNameFromURL";
import { removeImageFromS3 } from "@/libs/uploadsToS3";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    req: NextRequest,
    { params }: { params: { filename: string } }
) {
    try {
        const { filename } = params;
        const id = await req.json();
        
        // Delete image from S3
        const deletedImage = await removeImageFromS3(filename);

        if (!deletedImage) {
            return NextResponse.json({ message: "Failed to delete image from S3", status: 500 });
        }

        // Find the product
        const product = await Product.findById(id).exec();
        if (!product) {
            throw new Error("Product not found");
        }

        // Remove the image from the product's images_url array
        const updatedImagesUrl = product.images_url.filter((url: string) => extractFileNameFromURL(url) !== filename);
        product.images_url = updatedImagesUrl;

        // Save the updated product
        await product.save();

        return NextResponse.json({ message: "Image deleted successfully", status: 200 });

    } catch (error) {
        console.error("Error deleting image from S3", error);
        return NextResponse.json({ message: "Error deleting image from S3", status: 500 });
    }
}
