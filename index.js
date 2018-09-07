//Primary file for the api

//Dependencies
const http = require("http");
const url = require("url");
const { StringDecoder } = require('string_decoder');
// console.log({ stringDecoder: stringDecoder });

// The server should responce to all the requests with a string
var server = http.createServer(function(req, res) {
  //Get the url and parse it.
  const parsedUrl = url.parse(req.url, true);

  //Get the path.
  const path = parsedUrl.pathname;
  let truimmedPath = path.replace(/^\/+|\/+$/g, "");

  //get the query string as an object
  let queryStingObject = parsedUrl.query;
  // console.log({ queryStingObject: queryStingObject });

  //  console.log(parsedUrl)

  //Get the HTTP method
  const methoed = req.method.toLowerCase();

  //Get the header as an object
  const headers = req.headers;
  //Get the payload if any
  let decoder = new StringDecoder("utf-8");
  let buffer = "";
  req.on("data", function(data) {
    buffer += decoder.write(data);
  });
  req.on("end", function() {
    buffer += decoder.end()
    res.end("Hello world\n");
    console.log( buffer);
  });

});

// send the responce

// log the request path

//Start the server and have it listen on port 777
server.listen(3000, function() {
  console.log("server is listening on port 3000 now");
});
