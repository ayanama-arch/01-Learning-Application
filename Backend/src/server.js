require("./config/dotenv.config");
const cors = require("cors");
const express = require("express");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connectDB.config");
const errorHandler = require("./middleware/error-handler");
const routes = require("./routes/index.route");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(`/api/${process.env.API_VERSION}`, routes);

// Error Handler
app.use(errorHandler);
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running at PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  });
