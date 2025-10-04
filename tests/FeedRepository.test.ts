import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server';
import {FeedRepository} from 'src/infrastructure/repositories/FeedRepository/FeedRepository';
import {IFeed} from "src/domain/models/IFeed";

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
        const result = await repo.create(mockFeed);
        expect(result).toMatchObject(mockFeed);
    });

    it('should create a batch of feeds', async () => {
        const feeds = [mockFeed, {...mockFeed, title: 'Another Feed'}];
        const result = await repo.createBatch(feeds);
        expect(result.length).toBe(2);
    });

    it('should find all feeds published today', async () => {
        await repo.create(mockFeed);
        const result = await repo.findAll();
        expect(result.length).toBeGreaterThan(0);
    });

    it('should return no more than 5 feeds', async () => {
        const feeds: IFeed[] = Array.from({length: 10}, (_, i) => ({
            title: `Feed ${i + 1}`,
            description: `Description ${i + 1}`,
            imageUrl: null,
            author: null,
            url: `https://example.com/feed${i + 1}`,
            source: 'Test Source',
            publishedAt: new Date(),
            isManuallyAdded: false,
        }));

        await repo.createBatch(feeds);

        const result = await repo.findAll();
        expect(result.length).toBeLessThanOrEqual(5);
    });

    it('should find a feed by ID', async () => {
        const created = await repo.create(mockFeed);
        const found = await repo.findById(created._id.toString());
        expect(found?.title).toBe(mockFeed.title);
    });

    it('should update a feed', async () => {
        const created = await repo.create(mockFeed);
        const updated = await repo.update(created._id.toString(), {
            ...mockFeed,
            title: 'Updated Title',
        });
        expect(updated?.title).toBe('Updated Title');
    });

    it('should delete a feed', async () => {
        const created = await repo.create(mockFeed);
        const deleted = await repo.delete(created._id.toString());
        expect(deleted?._id.toString()).toBe(created._id.toString());

        const found = await repo.findById(created._id.toString());
        expect(found).toBeNull();
    });
});
