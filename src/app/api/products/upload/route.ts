import { NextResponse } from 'next/server';
import UploadImageToS3 from "@/libs/uploadsToS3";
import Product from '@/models/Product';

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const images = data.getAll('images') as File[];
    const id = data.get('id');

    if (!images || images.length === 0) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const imageLinks = await Promise.all(images.map(UploadImageToS3));
    const product = await Product.findById(id).exec();

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    product.images_url = [...product.images_url, ...imageLinks];
    await product.save();

    return NextResponse.json({ imageLinks });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
