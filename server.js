const express = require("express");
const next = require("next");

const dev = false;
const hostname = "localhost";
const port = parseInt(3001);
const app = next({ dev });
const handle = app.getRequestHandler();

var path = require("path");

app.prepare().then(() => {
  try {
    const server = express();
    server.all("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, () => {
      // console.log(`> Ready on http://${hostname}:${port}`);
    });
  } catch (error) {
    // console.log("Error", error);
  }
});
