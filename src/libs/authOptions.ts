import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/libs/mongoConnectWithProvider";
import connectToMongoDB from "@/libs/connectDB";
import User from "@/models/User";
import bcrypt from "bcrypt";
import type { NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { Adapter } from "next-auth/adapters";

const authOptions: NextAuthOptions = {
    debug: true,
    adapter: MongoDBAdapter(clientPromise) as Adapter,
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials): Promise<any> {
                await connectToMongoDB();
                const userDoc = await User.findOne({ email: credentials?.email });
                if (userDoc && credentials?.password && await bcrypt.compare(credentials.password, userDoc.password)) {
                    return {
                        id: userDoc._id.toString(), 
                        email: userDoc.email,
                        name: userDoc.name,
                        image: userDoc.image,
                        admin: userDoc.admin,
                        phone: userDoc.phone,
                        street: userDoc.street,
                        city: userDoc.city,
                        postalCode: userDoc.postalCode,
                        country: userDoc.country,
                    };
                }
                throw new Error("Invalid email or password");
            }

        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token } : any) {
            console.log('Token in Session callback:', token);
            session.user = {
                _id: token.id as string,
                email: token.email as string,
                name: token.name as string,
                image: token.image as string,
                admin: token.admin as boolean,
                phone: token.phone as string,
                street: token.street as string,
                city: token.city as string,
                postalCode: token.postalCode as string,
                country: token.country as string,
            };
            console.log('Session after Session callback:', session);
            return session;
        },
        
        async jwt({ token, user } : any) {
            if (user) {
                console.log('User in JWT callback:', user);
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.image = user.image;
                token.admin = user.admin;
                token.phone = user.phone;
                token.street = user.street;
                token.city = user.city;
                token.postalCode = user.postalCode;
                token.country = user.country;
                console.log('Token after JWT callback:', token);
            }
            return token;
        }
        
    }

};

export default authOptions;
