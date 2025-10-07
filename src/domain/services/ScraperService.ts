import {FeedRepository} from "src/infrastructure/repositories/FeedRepository/FeedRepository";
import {ElPaisScraper} from "src/domain/scrappers/ElPaisScraper";
import {ElMundoScraper} from "src/domain/scrappers/ElMundoScraper";
import {logger} from "src/utils/logger";

export class ScraperService {
    constructor(private repo: FeedRepository) {}

    async scrapeAndStore(): Promise<void> {
        const scrapers = [new ElPaisScraper(), new ElMundoScraper()];
        for (const scraper of scrapers) {
            const feeds = await scraper.fetch();
            await this.repo.createBatch(feeds);
        }
        logger.info("News scraped and saved successfully");
    }
}