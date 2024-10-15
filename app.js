// http module
const http = require("http");
const fs = require("fs");
// request listener takes 2 arguments request and response
// function rqListener(req, res) {}
//create server taking function to execute for every incoming request
// http.createServer(rqListener);

// can be used like this
// create server return server
// const server = http.createServer((req, res) => {
//   console.log("URL", req.url, req.method);
//   // setHeaders used to set the headers first header key then header value
//   res.setHeader("Content-Type", "text/html");
//   // write to send data in repsonse
//   res.write("<html>");
//   res.write("<head><title>My first NodeJs page</title></head>");
//   res.write("<body><h1>Hello, from Node.js Server!</h1></body>");
//   res.write("</html>");
//   // ----------------------------------------------------
//   // json
//   // res.setHeader("Content-Type", "application/json");
//   // res.write(JSON.stringify({ name: "ali", age: 24 }));
//   // end to end response and send it back
//   res.end();
// });
// ................................................
// to different responses for different urls
const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My first NodeJs page</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input name='message' required type='text'/><button>Submit</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && req.method === "POST") {
    const body = [];
    // listen for incoming data and apply this function for each chunk of data
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    // after ending from parsing the data or incoming request
    // we return it to stop execute the code
    return req.on("end", () => {
      // to deal with data we need to buffer them
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1].replaceAll("+", " ");
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        // to redirect
        res.setHeader("Location", "/");
        return res.end();
      });
    });
    // function here executes before req.on end
    // to create file
    // fs.writeFileSync("message.txt", "Dummy text");
    // status 302 for redirect user  or 301
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html><body><h1>Hello from Node.js</h1></body></html>");
  res.end();
});

// listen start the server will keep it running and listen for requests
// 1-take port which will listen for
// 2-host name default name of machine
server.listen(3000);
