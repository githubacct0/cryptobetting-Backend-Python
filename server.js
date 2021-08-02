const WebSocket = require('ws');
const redis = require('redis');


// Configuration: adapt to your environment
const REDIS_SERVER = "redis://localhost:6379";
const WEB_SOCKET_PORT = 8005;

// Connect to Redis and subscribe to "app:notifications" channel
var redisClient = redis.createClient(REDIS_SERVER);
redisClient.subscribe('BO-DATA');

var client = redis.createClient(REDIS_SERVER);

// Create & Start the WebSocket server
const server = new WebSocket.Server({ port: WEB_SOCKET_PORT });



// Register event for client connection
server.on('connection', function connection(ws) {

    // client.get("BO-DATA", (err, data) => {
    //     if (err) {
    //         console.error(err);
    //         // throw err;
    //     }
    //     else {
    //         console.log("1. Get key from redis - ", data);
    //         ws.send(data);
    //     }

    // });

    // broadcast on web socket when receving a Redis PUB/SUB Event
    redisClient.on('message', function (channel, message) {
        console.log(message);
        if ('ping' in message) {
            res = { "pong": message['ping'] }
            ws.send(res);
        }
        else {
            ws.send(message);
        }
    })

});

console.log("WebSocket server started at ws://locahost:" + WEB_SOCKET_PORT);