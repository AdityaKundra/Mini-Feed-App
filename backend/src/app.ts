import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { authMiddleware } from "./middleware/auth.middleware";
import { errorHandler, notFoundHandler, requestLogger, corsErrorHandler } from "./middleware/error.middleware";

import { swaggerDocument } from "./swagger";

// Routes Imports
import authRoutes from "./routes/Auth";
import postRoutes from "./routes/Post";
import commentRoutes from "./routes/Comment";
import likeRoutes from "./routes/Like";

const app = express();


const corsOptions = {
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept", "Origin", "X-Requested-With"]
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/auth", authRoutes);

app.use("/posts", authMiddleware, postRoutes);
app.use("/comments", authMiddleware, commentRoutes);
app.use("/likes", authMiddleware, likeRoutes);

app.use(corsErrorHandler);
app.use(errorHandler);
app.use(notFoundHandler);

export default app;
