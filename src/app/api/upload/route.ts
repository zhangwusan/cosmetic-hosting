import { NextResponse } from 'next/server';
import UploadImageToS3 from "@/libs/uploadsToS3";
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const id = data.get('id') as string;
    const image = data.get('images') as File;

    if (!id || !image) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const imageLink = await UploadImageToS3(image);
    const response = await User.findByIdAndUpdate(id, { image: imageLink }, { new: true });

    if (response) {
      return NextResponse.json({ imageLink });
    } else {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
