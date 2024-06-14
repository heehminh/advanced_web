// src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/typeList",
    createProxyMiddleware("/typeList", {
      target: "http://localhost:3003",
      changeOrigin: true,
    })
  );

  app.use(
    "/roomList",
    createProxyMiddleware("/roomList", {
      target: "http://localhost:3003",
      changeOrigin: true,
    })
  );

  app.use(
    "/markers",
    createProxyMiddleware("/markers", {
      target: "http://localhost:3003",
      changeOrigin: true,
    })
  );
};
