// import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import config from './config/index.js';
import db from './db/index.js';
import requestLogger from './middleware/requestLogger.js';
import errorHandler from './middleware/errorHandler.js';
import healthRouter from './routes/health.js';
import urlRouter from './routes/url.js';
import summaryRouter from './routes/summary.js';
import authRouter from './routes/auth.js';
import redirectRouter from './routes/redirect.js';

const app = express();

app.use(helmet());
// app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: config.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  }),
);

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/v1', apiLimiter);

if (config.NODE_ENV === 'development') {
    app.use(requestLogger);
}

app.use('/health', healthRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/url', urlRouter);
app.use('/api/v1/summary', summaryRouter);
// redirect route should be mounted last to avoid swallowing API routes
app.use('/', redirectRouter);

app.use(errorHandler);

const PORT = config.PORT;

let server: any;
console.log("first log");

async function start() {
    try {
        await db.connect();
        server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server', err);
        process.exit(1);
    }
}

start();

async function shutdown() {
    console.log('Shutting down...');
    if (server) {
        server.close(() => console.log('HTTP server closed'));
    }
    try {
        await db.disconnect();
    } catch (e) {
        console.error('Error during DB disconnect', e);
    }
    process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
