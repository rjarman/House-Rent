const app = require('./src/app');
const http = require('http');

const port = 8080;
// const port = process.env.port || 3000;

app.set('port', port);

const server = http.createServer(app);

server.listen(port, process.env.SERVER_IP);

