import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({
    status: 'success',
    message: 'MilestoneMind API is running',
  });
});

export default router;