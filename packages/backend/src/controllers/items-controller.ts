import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  console.log('fetch query');
});

router.get('/:id', (req, res) => {
  console.log('fetch id');
});

export default router;