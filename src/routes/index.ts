import { Router } from 'express';
import userRoute from './users';
import occurrences from './occurrences';
import booking from './booking';

const routes = Router();

routes.use(userRoute);
routes.use(booking);
routes.use(occurrences);

export default routes;
