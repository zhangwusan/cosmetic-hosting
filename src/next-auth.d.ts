import NextAuth from "next-auth/next"

declare module "next-auth" {
    interface Session {
        user: {
            _id: string
            email: string
            name?: string
            image?: string
            admin?: boolean
            phone?: string
            street?: string
            city?: string
            postalCode?: string
            country?: string
        }
    }
}