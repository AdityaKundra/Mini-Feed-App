import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { authMiddleware } from "./middleware/auth.middleware";
import { swaggerDocument } from "./swagger";
// Routes Imports
import authRoutes from "./routes/Auth";
import postRoutes from "./routes/Post";
import commentRoutes from "./routes/Comment";
import likeRoutes from "./routes/Like";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Auth Routes
app.use("/auth", authRoutes);
app.use("/post", authMiddleware, postRoutes);
app.use("/comment", authMiddleware, commentRoutes);
app.use("/like", authMiddleware, likeRoutes);

export default app;
