import {IFeed} from "src/domain/models/IFeed";
import {FeedDocument} from "src/infrastructure/database/FeedSchema";

export interface IFeedRepository {
    createBatch(data: IFeed[]): Promise<FeedDocument[]>;

    create(data: IFeed): Promise<FeedDocument>;

    findAll(): Promise<FeedDocument[]>;

    findById(id: string): Promise<FeedDocument | null>;

    update(id: string, data: IFeed): Promise<FeedDocument | null>;

    delete(id: string): Promise<FeedDocument | null>;
}