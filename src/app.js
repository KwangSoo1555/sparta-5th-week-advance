import express from 'express';
import router from './routers/index.js';
import 'dotenv/config';

import { connectPrisma } from './utils/prisma.util.js';
import { errorMiddleware } from './middlewares/error-handler.middleware.js';
import { logMiddleware } from './middlewares/log.middleware.js';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logMiddleware);
app.use(errorMiddleware);

app.use('/api', router);

connectPrisma();

app.get('/', (req, res) => {
  res.send('Hello world!!');
});

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
