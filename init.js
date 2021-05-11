import dotenv from "dotenv";
import "./db";
import app from "./app";

dotenv.config();

import "./models/Video";
import "./models/Comment";
import "./models/User";

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`✅ Listening on: http://localhost:${port}`);
});
