import mongoose from 'mongoose';
import dotenv from "dotenv";
import {logger} from "src/utils/logger";

describe('MongoDB Connection', () => {
    dotenv.config();

    const mongoUri = process.env.MONGO_URI;

    beforeAll(async () => {
        if (!mongoUri) {
            logger.error('Error: MONGO_URI is not defined in environment variables');
            process.exit(1);
        }
        await mongoose.connect(mongoUri);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should connect to MongoDB successfully', async () => {
        expect(mongoose.connection.readyState).toBe(1);
    });
});