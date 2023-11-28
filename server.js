const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
//const errorHandler = require("./middlewares/errorMiddleware");
const errorHandler = require("./middelwares/errorMiddleware");

// Routes
const authRoutes = require("./routes/authRoutes");
const openaiRoutes = require("./routes/openaiRoutes");

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Create an Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(errorHandler);

// Define the port, using process.env.PORT or default to 8080
const PORT = process.env.PORT || 8080;

// Define API routes
// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/openai", openaiRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/openai", require("./routes/openaiRoutes"));

// Start the server
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.bgCyan
      .white
  );
});
