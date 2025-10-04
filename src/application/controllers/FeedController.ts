import {Request, Response} from 'express';
import {FeedRepository} from "src/infrastructure/repositories/FeedRepository/FeedRepository";

export class FeedController {
    private repo = new FeedRepository();

    async getTodayTopFeeds(req: Request, res: Response) {
        const feeds = await this.repo.findAll();
        res.json(feeds);
    }

    async createManualFeed(req: Request, res: Response) {
        const feed = await this.repo.create({ ...req.body, isManuallyAdded: true });
        res.status(201).json(feed);
    }

    async deleteFeed(req: Request, res: Response) {
        await this.repo.delete(req.params.id);
        res.status(204).send();
    }
}