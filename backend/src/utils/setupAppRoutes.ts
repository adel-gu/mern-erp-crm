import { Router, Request, Response, NextFunction } from 'express';

interface Controller {
  readAll: (req: Request, res: Response, next: NextFunction) => void;
  create: (req: Request, res: Response, next: NextFunction) => void;
  read: (req: Request, res: Response, next: NextFunction) => void;
  update: (req: Request, res: Response, next: NextFunction) => void;
  delete: (req: Request, res: Response, next: NextFunction) => void;
}

const setupRoute = (
  router: Router,
  resourceName: string,
  controller: Controller,
): void => {
  router
    .route(`/${resourceName}`)
    .get(controller.readAll)
    .post(controller.create);
  router
    .route(`/${resourceName}/:id`)
    .get(controller.read)
    .patch(controller.update)
    .delete(controller.delete);
};

export default setupRoute;
