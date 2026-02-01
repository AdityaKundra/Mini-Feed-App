import dotenv from "dotenv";
dotenv.config();


import app from "./app";
import { connectDB } from "./config/db";

const PORT = parseInt(process.env.PORT || '4000', 10);

const startServer = async () => {
    try {
        app.listen(PORT, '0.0.0.0', () => console.log(`Server is running on http://0.0.0.0:${PORT}`));
        
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