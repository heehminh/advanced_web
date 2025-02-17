// src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/markers",
    createProxyMiddleware("/markers", {
      target: "http://localhost:3003",
      changeOrigin: true,
    })
  );
};
