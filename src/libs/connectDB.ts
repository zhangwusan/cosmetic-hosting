import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log("Database is connected successfully");
    } catch (error) {
        console.log(error);
    }
}

export default connectToMongoDB;

