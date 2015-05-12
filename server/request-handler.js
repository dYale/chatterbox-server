var utils = require('./utils');

var messages = [
    {
        text: "Hello Fred",
        username: "Alice"
    }
];


var actions = {
    'GET': function(request, response){
      utils.sendResponse(response, {results: messages}, 200)
    },
    'POST': function(request, response){
      utils.collectData(request, function(message){
        messages.unshift(message)
        utils.sendResponse(response, message, 201)
      });
    },
    'OPTIONS': function(request, response){
      utils.sendResponse(response, null)
    }
};

module.exports = function (request, response) {
var action = actions[request.method]
if(action){

    action(request, response);
} else { 
    utils.sendResponse(response, "Not Found", 404)
}


};