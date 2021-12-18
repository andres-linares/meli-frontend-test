import express from 'express';
import itemsController from './controllers/items-controller';

const app = express();
app.use(express.json());

app.use('/api/items', itemsController);

app.listen(8080, () => {
  console.log('[SERVER] Started Express app on port 8080')
});