const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

const proxyOptions = {
    target: "www.www.www",
    changeOrigin: true,
};

app.use("/api", createProxyMiddleware(proxyOptions));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});
