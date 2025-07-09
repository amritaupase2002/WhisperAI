import { createServer } from "http";
const port = process.env.PORT || 3000;
import app from "./app.js";

const server = createServer(app);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
