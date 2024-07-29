const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Middleware для установки заголовков CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(
  "/api",
  createProxyMiddleware({
    target: "https://course-api.com",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "", // Удаляет /api из URL
    },
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader("origin", "https://course-api.com");
    },
  })
);

app.listen(8080, () => {
  console.log("Proxy server is running on http://localhost:8080");
});
