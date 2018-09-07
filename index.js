//Primary file for the api

//Dependencies
const http = require('http')
const url =  require('url')

// The server should responce to all the requests with a string 
var server = http.createServer(function(req, res){
    //Get the url and parse it.
    const parsedUrl = url.parse(req.url, true)

 //Get the path.
 const path = parsedUrl.pathname
 let truimmedPath = path.replace(/^\/+|\/+$/g,'')
 
 //get the query string as an object
 let  queryStingObject = parsedUrl.query
 console.log({queryStingObject: queryStingObject})
 
 
//  console.log(parsedUrl)
 
 //Get the HTTP method
 const methoed = req.method.toLowerCase()

//Get the header as an object
const headers = req.headers

 // send the responce
 res.end('Hello world\n')

 // log the request path
 console.log(`Request received on path: 
          ${truimmedPath}
            with method
          ${methoed}
            with these query string parameters 
          ${{queryStingObject}}

          request received on the headers = ${headers}

`, queryStingObject, headers)
})
//Start the server and have it listen on port 777
server.listen(3000, function(){
    console.log('server is listening on port 3000 now')
})
