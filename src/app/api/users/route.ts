import connectToMongoDB from "@/libs/connectDB";
import UploadImageToS3 from "@/libs/uploadsToS3";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import uploadImageToS3 from "@/libs/uploadsToS3";

export async function GET(req: NextRequest) {
    try {
        await connectToMongoDB(); // connect to database mongodb
        const users = await User.find({}).exec(); // get all users from db
        return NextResponse.json(users); // send response to client
    } catch (error) {
        return NextResponse.json({ error: "Server error: " + error }); // send error response to client
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectToMongoDB(); // connect to database mongodb
        const data = await req.formData();
        const file = data.get('userImage') as File;
        // upload file to s3
        const imageUrl = await uploadImageToS3(file);
        const password = data.get('password') as string;
        // hash password using bcrypt
        const saltRound = 10
        const salt = bcrypt.genSaltSync(saltRound);
        const hashedPassword = await bcrypt.hashSync(password, salt);

        const user = new User({
            name: data.get('name') as string,
            email: data.get('email') as string,
            password: hashedPassword,
            image: imageUrl,
            admin: data.get('admin') ? data.get('admin') : false,
            phone: data.get('phone') as string,
            street: data.get('street') as string,
            city: data.get('city') as string,
            postalCode: data.get('postalCode') as string,
            country: data.get('country') as string,
        });

        await user.save(); // save user to db

        return NextResponse.json({ message: "User has been created." }); // send response to client
    } catch (error) {
        return NextResponse.json({ error: "Server error: " + error }); // send error response to client
    }
}

