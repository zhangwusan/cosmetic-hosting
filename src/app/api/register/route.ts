import connectToMongoDB from "@/libs/connectDB";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    const body = await request.json();
    await connectToMongoDB();

    const pass = body.password;
    if (!pass?.length || pass.length < 5) {
        throw new Error('Password must be at least 5 characters')
    }

    const notHashPassword = pass;
    const saltRound = 10
    const salt = bcrypt.genSaltSync(saltRound);
    const hashPassword = bcrypt.hashSync(notHashPassword, salt);
    body.password = hashPassword;

    const user = new User({
        name: body.name,
        email: body.email,
        password: body.password,
        image: body.image,
        admin: body.admin,
        phone: body.phone,
        street: body.street,
        city: body.city,
    })
    await user.save();
    return Response.json(user);
}