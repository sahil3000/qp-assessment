import mongoose from "mongoose"

export const connectDB = async () => {
    const uri = process.env.MONGOOSE_URI;
    if (!uri) {
        console.error("MONGOOSE_URI is not set in the environment variables.");
        return;
    }
    try {
        await mongoose.connect(uri);
        console.log("Mongodb connected successfully");
    } catch (error) {
        if (error instanceof Error)
            console.log("Mongodb connected fail", error.message);
    }
}