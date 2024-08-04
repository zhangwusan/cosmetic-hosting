import connectToMongoDB from "@/libs/connectDB";
import { getServerSession } from "next-auth";
import User from "@/models/User";
import authOptions from "@/libs/authOptions";

export async function PUT(req: Request) {
    await connectToMongoDB();
    const data = await req.json();
    const session: any = await getServerSession(authOptions)
    const email = session.user.email;

    await User.updateOne({email}, data)

    return Response.json(true);
}


export async function GET(){
    await connectToMongoDB();
    const session : any = await getServerSession(authOptions);
    const email = session.user.email;
    const user = await User.findOne({email});
    return Response.json(user);
}