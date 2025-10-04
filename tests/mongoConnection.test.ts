import mongoose from 'mongoose';

describe('MongoDB Connection', () => {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/test-db';

    beforeAll(async () => {
        await mongoose.connect(mongoUri);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should connect to MongoDB successfully', async () => {
        expect(mongoose.connection.readyState).toBe(1);
    });
});