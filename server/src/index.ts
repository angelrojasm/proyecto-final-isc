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
      ], // we specify controllers we want to use
    });
    // setup express app here
    app.use(express.json());
    app.use(fileupload());
    // ...

    // start express server
    app.listen(PORT, () => {
      console.log(`Express server has started on port ${PORT}. `);
    });
  })
  .catch((error) => console.log(error));
