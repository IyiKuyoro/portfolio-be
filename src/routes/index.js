import { Router } from 'express';

import authRouter from './auth';
import articlesRouter from './articles';

const router = Router();

router.use('/auth', authRouter);
router.use('/articles', articlesRouter);

export default router;
