const express = require("express");
const path = require("path");

const databaseConfig = require("./server/config/database");
const routesConfig = require("./server/config/routes");
const expressConfig = require("./server/config/express");
const storage = require("./server/middlewares/storage");

const allowed = [
  ".js",
  ".css",
  ".png",
  ".jpg"
];

start();

async function start() {
  const port = 3000;
  const app = express();

  await databaseConfig(app);
  app.use(await storage());

  expressConfig(app);

  app.get("*", (req, res) => {
    if (allowed.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
        res.sendFile(path.resolve(`dist/jdm/${req.url}`));
    } else {
        res.sendFile(path.join(__dirname, "dist/jdm/index.html"));
    }
});

  app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`)
  );
}
