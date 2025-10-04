import { FeedController } from 'src/application/controllers/FeedController';
import { Request, Response } from 'express';
import { IFeed } from 'src/domain/models/IFeed';
import FeedModel, { FeedDocument } from 'src/infrastructure/database/FeedSchema';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let controller: FeedController;
let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    controller = new FeedController();
});

afterEach(async () => {
    await FeedModel.deleteMany({});
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

const mockFeed: IFeed = {
    title: 'Test Feed',
    description: 'This is a test feed',
    imageUrl: null,
    author: null,
    url: 'https://example.com/feed',
    source: 'Test Source',
    publishedAt: new Date(),
    isManuallyAdded: true,
};

function createMockResponse<T = unknown>(): Response<T> {
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
    } as unknown as Response<T>;
    return res;
}

describe('FeedController', () => {
    it('should create a manual feed', async () => {
        const req: Request<Record<string, never>, FeedDocument, IFeed> = {
            body: mockFeed,
        } as Request<Record<string, never>, FeedDocument, IFeed>;

        const res = createMockResponse<FeedDocument>();

        await controller.createManualFeed(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ title: mockFeed.title }));
    });

    it('should return today\'s top feeds (max 5)', async () => {
        const feeds: IFeed[] = Array.from({ length: 10 }, (_, i) => ({
            ...mockFeed,
            title: `Feed ${i + 1}`,
            url: `https://example.com/${i + 1}`,
            publishedAt: new Date(),
        }));

        await FeedModel.insertMany(feeds);

        const req: Request<Record<string, never>> = {} as Request<Record<string, never>>;
        const res = createMockResponse<FeedDocument[]>();

        await controller.getTodayTopFeeds(req, res);

        const returnedFeeds = (res.json as jest.Mock).mock.calls[0][0];
        expect(returnedFeeds.length).toBeLessThanOrEqual(5);
    });

    it('should delete a feed', async () => {
        const created = await FeedModel.create(mockFeed);

        const req: Request<{ id: string }> = {
            params: { id: created._id.toString() },
        } as Request<{ id: string }>;

        const res = createMockResponse<unknown>();

        await controller.deleteFeed(req, res);

        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalled();

        const found = await FeedModel.findById(created._id);
        expect(found).toBeNull();
    });
});