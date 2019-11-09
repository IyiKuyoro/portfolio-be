import { Router } from 'express';

import authRouter from './auth';
import articlesRouter from './articles';
import twitterRouter from './twitter';
import projectRouter from './project';
import fileRouter from './files';
import imageRouter from './images';

const router = Router();

router.use('/auth', authRouter);
router.use('/articles', articlesRouter);
router.use('/twitter', twitterRouter);
router.use('/project', projectRouter);
router.use('/files', fileRouter);
router.use('/images', imageRouter);

export default router;
