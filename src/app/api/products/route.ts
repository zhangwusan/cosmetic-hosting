import connectToMongoDB from "@/libs/connectDB";
import UploadImageToS3 from "@/libs/uploadsToS3";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {
        await connectToMongoDB();
        const products = await Product.find({}).exec();
        return NextResponse.json(products);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error!" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        
        const files = formData.getAll('images') as File[];
        if (files.length === 0) {
            return NextResponse.json({ message: "No files uploaded" }, { status: 400 });
        }

        const linkImages = await Promise.all(files.map(file => UploadImageToS3(file)));
        // Retrieve other form data fields
        const name = formData.get('name') as string;
        const category = formData.get('category') as string;
        const brand = formData.get('brand') as string;
        const price = parseFloat(formData.get('price') as string);
        const stock = parseInt(formData.get('stock') as string);
        const discount = parseFloat(formData.get('discount') as string);
        const rating = parseFloat(formData.get('rating') as string);
        const description = formData.get('description') as string;
        const supplier = formData.get('supplier') as string;

        await connectToMongoDB();
        
        const newProduct = new Product({
            name,
            category,
            brand,
            price,
            stock,
            discount,
            rating,
            description,
            supplier,
            images_url: linkImages,
        });

        await newProduct.save();

        return NextResponse.json({ message: "Product saved", product: newProduct }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error!" }, { status: 500 });
    }
}


