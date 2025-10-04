import FeedModel, {FeedDocument} from "src/infrastructure/database/FeedSchema";
import {IFeed} from "src/domain/models/IFeed";
import {IFeedRepository} from "src/infrastructure/repositories/FeedRepository/IFeedRepository";

export class FeedRepository implements IFeedRepository {
    async createBatch(data: IFeed[]): Promise<FeedDocument[]> {
        try {
            return await FeedModel.insertMany(data, {ordered: false});
        } catch (error) {
            if (error && typeof error === 'object' && 'insertedDocs' in error) {
                return (error as { insertedDocs: FeedDocument[] }).insertedDocs;
            }
            return [];
        }
    }

    async create(data: IFeed): Promise<FeedDocument> {
        return FeedModel.create(data);
    }

    async findAll(): Promise<FeedDocument[]> {
        const start = new Date();
        start.setHours(0, 0, 0, 0);

        const end = new Date();
        end.setHours(23, 59, 59, 999);

        return FeedModel.find({
            publishedAt: {$gte: start, $lte: end}
        })
            .sort({publishedAt: -1})
            .limit(5)
    }

    async findById(id: string): Promise<FeedDocument | null> {
        return FeedModel.findById(id);
    }

    async update(id: string, data: IFeed): Promise<FeedDocument | null> {
        return FeedModel.findByIdAndUpdate(id, data, {new: true});
    }

    async delete(id: string): Promise<FeedDocument | null> {
        return FeedModel.findByIdAndDelete(id);
    }
}
