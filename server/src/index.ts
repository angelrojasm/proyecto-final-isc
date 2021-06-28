import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import { userRouter } from './routers/userRouter';
import { createExpressServer } from 'routing-controllers';
import { UserController } from './controllers/UserController';
const PORT = process.env.PORT || 4000;
createConnection()
  .then(() => {
    // create express app
    // const app = express();
    // app.use(express.json());
    // app.use('/users', userRouter);
    const app = createExpressServer({
      controllers: [UserController], // we specify controllers we want to use
    });
    // setup express app here
    app.use(express.json());
    // ...

    // start express server
    app.listen(PORT, () => {
      console.log(`Express server has started on port ${PORT}. `);
    });
  })
  .catch((error) => console.log(error));
