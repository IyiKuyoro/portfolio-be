import { Router } from 'express';

import authRouter from './auth';
import articlesRouter from './articles';
import twitterRouter from './twitter';
import projectRouter from './project';
import fileRouter from './files';

const router = Router();

router.use('/auth', authRouter);
router.use('/articles', articlesRouter);
router.use('/twitter', twitterRouter);
router.use('/project', projectRouter);
router.use('/files', fileRouter);

export default router;
