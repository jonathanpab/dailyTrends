import 'module-alias/register';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import feedRoutes from './application/routes/FeedRoutes';
import {logger} from './utils/logger';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/feeds', feedRoutes);

const mongoUri = process.env.MONGO_URI;
const port = process.env.PORT;

if (!mongoUri) {
    logger.error('Error: MONGO_URI is not defined in environment variables');
    process.exit(1);
}

mongoose
    .connect(mongoUri)
    .then(() => {
        app.listen(port, () => {
            logger.info(`DailyTrends API running on port ${port}`);
        });
    })
    .catch((err) => {
        logger.error('Error: Failed to connect to MongoDB', err);
        process.exit(1);
    });