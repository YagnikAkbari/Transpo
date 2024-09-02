const express = require("express");
const app = express();
const cors = require('cors');
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 5000;

require("./db/conn");

app.use(express.json());
app.use(cookieParser());
// Enable CORS to allow requests from port 3000
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from your frontend
}));
app.use(require("./router/auth"));

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "client", "build", "index.html"),
      function (err) {
        if (err) {
          res.status(500).send(err);
        }
      }
    );
  });
}

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
