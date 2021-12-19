import express from 'express';
import morgan from 'morgan';
import config from 'config';
import itemsController from './controllers/items-controller';

const EXPRESS_PORT = config.get('expressPort') as number | 8080;
const NODE_ENV = process.env.NODE_ENV || 'dev';

const app = express();
app.use(morgan(NODE_ENV === 'dev' ? 'dev' : 'common'));
app.use(express.json());

app.use('/api/items', itemsController);

app.listen(EXPRESS_PORT, () => {
  console.log(`[SERVER] Started Express app on port ${EXPRESS_PORT}`)
});