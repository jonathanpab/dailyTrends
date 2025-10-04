import FeedModel, {FeedDocument} from "src/infrastructure/database/Feed";
import {IFeed} from "src/domain/models/IFeed";
import {IFeedRepository} from "src/infrastructure/repositories/FeedRepository/IFeedRepository";

export class FeedRepository implements IFeedRepository {
    async create(data: IFeed): Promise<FeedDocument> {
        return FeedModel.create(data);
    }

    async findAll(): Promise<FeedDocument[]> {
        return FeedModel.find();
    }

    async findById(id: string): Promise<FeedDocument | null> {
        return FeedModel.findById(id);
    }

    async update(id: string, data: IFeed): Promise<FeedDocument | null> {
        return FeedModel.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string): Promise<FeedDocument | null> {
        return FeedModel.findByIdAndDelete(id);
    }
}
