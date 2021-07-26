import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import fileupload from 'express-fileupload';
import { createExpressServer } from 'routing-controllers';
import { UserController } from './controllers/UserController';
import { GroupController } from './controllers/GroupController';
import { FileController } from './controllers/FileController';
import { PostController } from './controllers/PostController';
import { CommentController } from './controllers/CommentController';
import { PredictionController } from './controllers/PredictionController';

const PORT = process.env.PORT || 4000;

createConnection()
  .then(() => {
    // create express app

    const app = createExpressServer({
      controllers: [
        UserController,
        GroupController,
        FileController,
        PostController,
        CommentController,
        PredictionController,
      ], // we specify controllers we want to use
    });
    // setup express app here
    app.use(express.json());
    app.use(fileupload());

    // Setup Socket.io Server
    // let http = require('http').Server(app);
    // let io = require('socket.io')(http);

    // //Initialize Connection
    // io.on('connection', (socket) => {
    //   //User List
    //   let userList = {};
    //   console.log('connection established');

    //   socket.join('chat-room');
    //   socket.on('test', (response) => {
    //     socket.emit('test-response', 'hola te conectaste');
    //   });
    //   socket.on('username-response', (response) => {
    //     userList[socket.handshake.issued] = response;
    //     io.to('chat-room').emit('user-list', userList);
    //   });
    //   socket.on('disconnect', () => {
    //     delete userList[socket.handshake.issued];
    //     io.to('chat-room').emit('user-list', userList);
    //   });
    // });

    // start express server
    app.listen(PORT, () => {
      console.log(`Express server has started on port ${PORT}. `);
    });
  })
  .catch((error) => console.log(error));
