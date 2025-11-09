const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
require("./config/database_connections");
require("./utils/email/emailQueue");

const authRoutes = require("./routes/auth");


app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173","https://aisat-system-client.vercel.app"
    ],
    credentials: true,
  })
);
app.use(morgan("dev"));

app.use("/api/v1/", authRoutes);

module.exports = app;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
