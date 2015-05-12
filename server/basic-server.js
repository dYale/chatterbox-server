/* Import node's http module: */
var http = require("http");
var urlParser = require('url')
var utils = require('./utils')
var handleRequest = require('./request-handler');




var port = 3000;

var ip = "127.0.0.1";

var routes = {
	'/classes/chatterbox': handleRequest,
	'/classes/messages': handleRequest,
	'/classes/room1': handleRequest,
	'/classes/room': handleRequest,
	'/log': handleRequest,
	'/send' : handleRequest,
	'/': handleRequest
}

var server = http.createServer(function(request, response){

	var parts = urlParser.parse(request.url)
	var route = routes[parts.pathname];

if(route){
    route(request, response);
} else { 
    utils.sendResponse(response, "Not Found", 404)
}

});



console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
