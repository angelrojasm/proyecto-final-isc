import { UserController } from '../controllers/UserController';
import { Request, Response, Router } from 'express';

export const userRouter = Router();

const Routes = [
  {
    method: 'get',
    route: '/',
    controller: UserController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/:id',
    controller: UserController,
    action: 'one',
  },
  {
    method: 'post',
    route: '',
    controller: UserController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/:id',
    controller: UserController,
    action: 'remove',
  },
];

// register express routes from defined application routes
Routes.forEach((route) => {
  (userRouter as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
    const result = new (route.controller as any)()[route.action](req, res, next);
    if (result instanceof Promise) {
      result.then((result) => (result ? res.send(result) : undefined));
    } else if (result) {
      res.json(result);
    }
  });
});
