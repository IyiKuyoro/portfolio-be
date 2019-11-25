import { Router } from 'express';

import AuthMiddleware from '../middlewares/AuthMiddleware';
import DraftMiddlewares from '../middlewares/DraftMiddleware';
import DraftController from '../controllers/DraftController';

const draftRouter = Router();

// Access middlewares
draftRouter.use(
  AuthMiddleware.validateToken,
  AuthMiddleware.validateAdmin,
);

// Save new draft
draftRouter.post(
  '/',
  DraftMiddlewares.validateParams,
  DraftMiddlewares.validateValues,
  DraftController.createDraft,
);

// Get all drafts
draftRouter.get(
  '/',
  (req, res) => {
    res.status(200).json({});
  },
);

// Delete draft
draftRouter.delete(
  '/',
  (req, res) => {
    res.status(200).json({});
  },
);

// Edit draft
draftRouter.put(
  '/',
  (req, res) => {
    res.status(200).json({});
  },
);

export default draftRouter;
