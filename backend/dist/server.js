import express from 'express';
import cors from 'cors';
import config from './config/index.js';
import db from './db/index.js';
import requestLogger from './middleware/requestLogger.js';
import errorHandler from './middleware/errorHandler.js';
import healthRouter from './routes/health.js';
import urlRouter from './routes/url.js';
import summaryRouter from './routes/summary.js';
import redirectRouter from './routes/redirect.js';
const app = express();
app.use(express.json());
app.use(cors());
if (config.NODE_ENV === 'development') {
    app.use(requestLogger);
}
// app.get('/', (req, res) => res.send('AI URL Shortener API'));
app.use('/health', healthRouter);
app.use('/api/url', urlRouter);
app.use('/api/summary', summaryRouter);
// redirect route should be mounted last to avoid swallowing API routes
app.use('/', redirectRouter);
app.use(errorHandler);
const PORT = config.PORT;
let server;
async function start() {
    try {
        await db.connect();
        server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (err) {
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
    }
    catch (e) {
        console.error('Error during DB disconnect', e);
    }
    process.exit(0);
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
