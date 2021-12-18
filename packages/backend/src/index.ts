import express from 'express';
import config from 'config';
import itemsController from './controllers/items-controller';

const app = express();
app.use(express.json());

const EXPRESS_PORT = config.get('expressPort') as number | 8080;

app.use('/api/items', itemsController);

app.listen(EXPRESS_PORT, () => {
  console.log(`[SERVER] Started Express app on port ${EXPRESS_PORT}`)
});