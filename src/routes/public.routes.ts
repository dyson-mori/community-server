import { Router } from 'express';

import { PostControllers, UserController, AdminController, TagsControllers } from '../modules';
import { middleware } from '../middleware';

const publicRoute = Router();

const postsControllers = new PostControllers();
// const userController = new UserController();
const adminController = new AdminController();
const tagsControllers = new TagsControllers();

publicRoute.post('/admin-login', adminController.login);
publicRoute.post('/admin-signup', adminController.signup);

// publicRoute.post('/login', userController.login);
// publicRoute.post('/signup', userController.signup);

publicRoute.get('/posts', [middleware.unlogged], postsControllers.index);
publicRoute.get('/tags', [middleware.unlogged], tagsControllers.index);

export { publicRoute };
