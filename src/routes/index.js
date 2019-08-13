import { Router } from 'express';

import authRouter from './auth';
import articlesRouter from './articles';
import twitterRouter from './twitter';
import projectRouter from './project';

const router = Router();

router.use('/auth', authRouter);
router.use('/articles', articlesRouter);
router.use('/twitter', twitterRouter);
router.use('/project', projectRouter);

export default router;
