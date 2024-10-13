// http module
const http = require("http");
// request listener takes 2 arguments request and response
// function rqListener(req, res) {}
//create server taking function to execute for every incoming request
// http.createServer(rqListener);

// can be used like this
// create server return server
const server = http.createServer((req, res) => {
  console.log(req);
});

// listen start the server will keep it running and listen for requests
// 1-take port which will listen for
// 2-host name default name of machine
server.listen(3000);
