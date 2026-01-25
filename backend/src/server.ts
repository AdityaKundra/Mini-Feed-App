import dotenv from "dotenv";
dotenv.config();


import app from "./app";
import { connectDB } from "./config/db";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        // Start server first
        app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
        
        try {
            await connectDB();
        } catch (dbError) {
            console.warn("MongoDB connection failed, but server is still running");

        }
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();