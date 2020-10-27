const app = require('./libs/app');
const port = process.env.port || 3000;

app.set('port', port);
require('http').createServer(app).listen(port, process.env.SERVER_IP);
