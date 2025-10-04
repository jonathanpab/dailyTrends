import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { FeedRepository } from 'src/infrastructure/repositories/FeedRepository/FeedRepository';
import { FeedDocument } from 'src/infrastructure/database/Feed';

let mongoServer: MongoMemoryServer;
const repo = new FeedRepository();

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    if (mongoose.connection.db) {
        const collections = await mongoose.connection.db.collections();
        for (const collection of collections) {
            await collection.deleteMany({});
        }
    } else {
        return;
    }
});

describe('FeedRepository (in-memory)', () => {
    const mockFeed = {
        title: 'Test Feed',
        url: 'https://example.com',
        source: 'Example Source',
        publishedAt: new Date(),
        isManuallyAdded: true,
    };

    it('should create a feed', async () => {
        const result: FeedDocument = await repo.create(mockFeed);
        expect(result).toHaveProperty('_id');
        expect(result.title).toBe(mockFeed.title);
    });

    it('should find all feeds', async () => {
        await repo.create(mockFeed);
        const feeds: FeedDocument[] = await repo.findAll();
        expect(feeds.length).toBe(1);
        expect(feeds[0].title).toBe(mockFeed.title);
    });

    it('should find a feed by ID', async () => {
        const created: FeedDocument = await repo.create(mockFeed);
        const found = await repo.findById(created._id.toString());
        expect(found?.title).toBe(mockFeed.title);
    });

    it('should update a feed', async () => {
        const created: FeedDocument = await repo.create(mockFeed);
        const updated = await repo.update(created._id.toString(), {
            ...mockFeed,
            title: 'Updated Title',
        });
        expect(updated?.title).toBe('Updated Title');
    });

    it('should delete a feed', async () => {
        const created: FeedDocument = await repo.create(mockFeed);
        const deleted = await repo.delete(created._id.toString());
        expect(deleted?.title).toBe(mockFeed.title);

        const found = await repo.findById(created._id.toString());
        expect(found).toBeNull();
    });
});
