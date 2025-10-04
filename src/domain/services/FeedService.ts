import {FeedRepository} from "src/infrastructure/repositories/FeedRepository/FeedRepository";
import {IFeed} from "src/domain/models/IFeed";

export class FeedService {
    constructor(private repo = new FeedRepository()) {
    }

    getAll() {
        return this.repo.findAll();
    }

    getById(id: string) {
        return this.repo.findById(id);
    }

    create(feed: IFeed) {
        return this.repo.create(feed);
    }

    update(id: string, data: IFeed) {
        return this.repo.update(id, data);
    }

    delete(id: string) {
        return this.repo.delete(id);
    }
}
