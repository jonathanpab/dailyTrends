import {Schema, model, HydratedDocument} from 'mongoose';
import {IFeed} from "src/domain/models/IFeed";

export type FeedDocument = HydratedDocument<IFeed>;
const feedDefinition = {
    title: {type: String, required: true},
    description: String,
    imageUrl: String,
    author: String,
    url: {type: String, required: true},
    source: {type: String, required: true},
    publishedAt: {type: Date, default: Date.now},
    isManuallyAdded: {type: Boolean, default: false}
};

const feedSchemaSettings = {
    toJSON: {
        transform: (doc: HydratedDocument<IFeed>, ret: Record<string, unknown>) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    },

    toObject: {
        transform: (doc: HydratedDocument<IFeed>, ret: Record<string, unknown>) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
};

const FeedSchema = new Schema(feedDefinition, feedSchemaSettings);
export const FeedModel = model<FeedDocument>('Feed', FeedSchema);
export default FeedModel;