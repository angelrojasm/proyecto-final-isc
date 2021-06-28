import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import { userRouter } from './routers/userRouter';

createConnection()
  .then(() => {
    // create express app
    const app = express();
    app.use('/users', userRouter);
    // setup express app here

    // ...

    // start express server
    app.listen(process.env.PORT || 4000, () => {
      console.log('Express server has started on port 4000. ');
    });
  })
  .catch((error) => console.log(error));
