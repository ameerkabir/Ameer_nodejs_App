//Primary file for the api

//Dependencies
const http = require("http");
const https = require('https')
const url = require("url");
const { StringDecoder } = require('string_decoder');
const config = require('./config')
const fs = require('fs')

//Instantiate the http server 
var httpServer = http.createServer(function(req, res) {
  
unfiedServer(req,res)
});
//Start the server.
httpServer.listen(config.httpPort, function() {
  console.log(`server is listening on port ${config.httpPort} in ${config.envNmae} mode`);
});
//instantiate the https server
var httpsServerOption = {
  'key': fs.readFileSync('./https/key.pem'),
  'cert': fs.readFileSync('./https/cert.pem')
}
var httpsServer = https.createServer(httpsServerOption,function(req, res) {
  
  unfiedServer(req,res)
  });
  //Start the server.
  httpsServer.listen(config.httpsPort, function() {
  console.log(`server is listening on port ${config.httpsPort} in ${config.envNmae} mode`);
});

//All the server logic for both http and https servers
const unfiedServer = function(req,res){
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
    //chose the handler this request should go to, if one not found chose the notfound handler
   var chosenHandler = typeof(router[truimmedPath]) !== 'undefined'? router[truimmedPath] : handlers.notFound
   //construct the data object to send to the handler
   let data = {
     'truimmedPath': truimmedPath,
     'queryStingObject': queryStingObject,
     'methoed': methoed,
     headers: headers,
     payload: buffer
     
    };
    // console.log(JSON.stringify(data))

   chosenHandler(data, function(statusCode, payload){
     //use payload call back by the handler, or use the default
     statusCode = typeof(statusCode) === 'number' ? statusCode : 200;
     payload = typeof(payload) === 'object' ? payload : {}
    const payloadString = JSON.stringify(payload)
    res.setHeader('content-Type', 'application/json')
    res.writeHead(statusCode)
    res.end(payloadString);
    console.log("Returning this responses:", statusCode, payloadString);
   })
    // send the responce

  });

}
//Define the handlers 
let handlers = {}
handlers.sample = function(data, callback){
//callback a http status code and a payload object
callback(406, {'name': 'sample handlers' })
}
handlers.result = function(data, callback){
  callback(202, {'practice makes': 'perment'})
}
handlers.notFound = function(data, callback){
callback(404);
}
//Define request router 
router = {
  'sample': handlers.sample,
  'result': handlers.result


}