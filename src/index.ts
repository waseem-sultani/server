import express from "express";
import User from "./controllers/user/index.js";

const app = express();
const PORT = 5000;

app.use(express.json());

app.use("/user", User);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
