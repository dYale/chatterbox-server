var qs = require('querystring');
var fs = require('fs');
var assert = require('assert');
var _ = require('underscore');
var localData = {};
var messagesArray = [];


exports.requestHandler = function (request, response) {
    var currentUrl = ['/classes/room1', '/send', '/classes/room', '/classes/messages', '/']
    if (request.method === 'POST') {
        if (currentUrl.indexOf(request.url) !== -1) {
            var statusCode = 201;
        } else {

            var statusCode = 404;
        }

        var headers = defaultCorsHeaders;
        headers["Content-Type"] = "application/json";
        response.writeHead(statusCode, headers);

        var body = '';
        request.on('data', function (data) {
            body += data;

            if (body.length > 1e6) {
                request.connection.destroy()
            }
        });

        request.on('end', function () {
            messagesArray.unshift(JSON.parse(body));
        });

        var r = {
            result: ['SUCCESS']
        }
        response.end(JSON.stringify(r))

    } else if(request.method === 'GET' || request.method ==='OPTIONS'){

      console.log(request.url)
        if (currentUrl.indexOf(request.url) !== -1 && request.url !== './arglebargle') {
            var statusCode = 200;
        } else {

            var statusCode = 404;
        }
        var headers = defaultCorsHeaders;
        headers['Content-Type'] = "application/json"

        console.log("Serving request type " + request.method + " for url " + request.url);

        response.writeHead(statusCode, headers);





        // Make sure to always call response.end() - Node may not send
        // anything back to the client until you do. The string you pass to
        // response.end() will be the body of the response - i.e. what shows
        // up in the browser.

        //
        // Calling .end "flushes" the response's internal buffer, forcing
        // node to actually send all the data over to the client.


        response.end(JSON.stringify({
            results: messagesArray
        }))
    } 
};


defaultCorsHeaders = {
    "access-control-allow-origin": "*",
        "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
        "access-control-allow-headers": "content-type, accept",
        "access-control-max-age": 10 // Seconds.
};