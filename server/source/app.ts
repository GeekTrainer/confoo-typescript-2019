import restify = require('restify');
import { Task, TaskModel } from './models';
import corsMiddleware = require('restify-cors-middleware');
import mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/confoo-demos');

const server = restify.createServer();
server.listen(8080);
server.use(restify.plugins.bodyParser());

const cors = corsMiddleware({
    origins: [
        'http://localhost:3000'
    ],
    allowHeaders: ['*'],
    exposeHeaders: ['*']
})
server.pre(cors.preflight);
server.use(cors.actual);

server.get('/tasks', async (req, res) => {
    const tasks = await TaskModel.find() as Task[];
    res.send(200, tasks);
    res.end();
});

server.post('/tasks', async (req, res) => {
    const task = req.body as Task;
    await TaskModel.create(task);
    res.send(201);
    res.end();
});
