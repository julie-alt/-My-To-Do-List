import http from "http";
import fs from "fs";
import path from "path";

const PORT = 5000;

const server = http.createServer((req, res) => {
  let filePath = "." + req.url;
  if (filePath === "./") filePath = "./index.html";

  const extname = path.extname(filePath);
  let contentType = "text/html";

  if (extname === ".css") contentType = "text/css";
  if (extname === ".js") contentType = "text/javascript";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("File not found");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data, "utf-8");
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
