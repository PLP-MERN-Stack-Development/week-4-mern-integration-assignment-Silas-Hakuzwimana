// Import required modules
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorMiddleware");

// Import routes
const postRoutes = require("./routes/posts");
const categoryRoutes = require("./routes/categories");
const authRoutes = require("./routes/auth");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    console.log(`[DEV LOG] ${req.method} ${req.url}`, req.body);
    next();
  });
}

// API Routes
app.use("/api/posts", postRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("🚀 MERN Blog API is running...");
});

// Error Handling Middleware
app.use(errorHandler);

// Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err.message);
  process.exit(1);
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
