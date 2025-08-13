import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import config from './config';
import routes from './routes';
import { setupSwagger } from './docs/swagger';
import mongoSanitize from 'express-mongo-sanitize';
import { Server as HTTPServer } from 'http';
import { Server as IOServer } from 'socket.io';

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(mongoSanitize());

mongoose.set('strictQuery', true);
mongoose
  .connect(config.mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api', routes);
setupSwagger(app);

const server = new HTTPServer(app);
export const io = new IOServer(server, {
  cors: {
    origin: '*',
  },
});

const PORT = config.port || 80;
server.listen(PORT, () => {
  console.info(`🚀 Server running on http://localhost:${PORT ?? 80}/api 🚀`);
  console.info(
    `🦖 Server swagger on http://localhost:${PORT ?? 80}/api/swagger-docs 🦖`,
  );
});
