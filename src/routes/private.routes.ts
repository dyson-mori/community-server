import { Router } from 'express';
import multer from 'multer';

import * as Modules from '../modules';

import storageTypes from '../utils/multer';
import { middleware } from '../middleware';

const privateRoute = Router();

const postsControllers = new Modules.PostControllers();
const tagsControllers = new Modules.TagsControllers();
// const commentController = new Modules.CommentController();
// const historyController = new Modules.HistoryController();
// const folderController = new Modules.FolderController();

const storage = storageTypes.single('file');
// const upload = multer({ storage: multer.memoryStorage() });

privateRoute.post('/posts', [middleware.admin, storage], postsControllers.create);
// privateRoute.post('/json', upload.single('file'), postsControllers.json);
// privateRoute.post('/like', [middleware.logged], postsControllers.like);
// privateRoute.put('/posts', [middleware.admin], postsControllers.update);

privateRoute.post('/tags', [middleware.admin], tagsControllers.create);
// privateRoute.put('/tags', [middleware.admin], tagsControllers.update);

// privateRoute.get('/history', [middleware.logged], historyController.create);
// privateRoute.post('/history', [middleware.logged], historyController.create);

// privateRoute.get('/folder', [middleware.logged], folderController.index);
// privateRoute.post('/folder', [middleware.logged], folderController.create);
// privateRoute.post('/adding', [middleware.logged], folderController.adding);

// privateRoute.post('/comment', [middleware.logged], commentController.create);

export { privateRoute };
