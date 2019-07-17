import { Router } from 'express';

import authRouter from './auth';
import articlesRouter from './articles';
import twitterRouter from './twitter';

const router = Router();

router.use('/auth', authRouter);
router.use('/articles', articlesRouter);
router.use('/twitter', twitterRouter);

export default router;
