import express from "express";
import myDB from "./database/db.js";
import quizRoutes from "./routes/quizRoutes.js";
import responseRoutes from "./routes/responseRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static("frontend"));
app.use(express.json());

// Routes
app.use("/api/quizzes", quizRoutes);
app.use("/api/responses", responseRoutes);


const startServer = async () => {
  await myDB.connect();
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
};

startServer();
