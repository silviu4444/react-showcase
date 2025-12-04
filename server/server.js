import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

const port = 4000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const staticPath = path.join(__dirname, "dist");
app.use(cookieParser());

const DEV_ACCESS_TOKEN = "2209";

app.use((req, res, next) => {
  if (req.cookies.developer_access_cookie_prv === "true") {
    return next();
  }

  if (req.query["dev_token"] === DEV_ACCESS_TOKEN) {
    res.cookie("developer_access_cookie_prv", "true", {
      maxAge: 30 * 24 * 60 * 60 * 1000
    });
    return res.redirect(req.originalUrl);
  }

  return res.sendFile(staticPath + "/under-construction.html");
});

app.use(express.static(staticPath));

app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Client server listening on port ${port}`);
});
