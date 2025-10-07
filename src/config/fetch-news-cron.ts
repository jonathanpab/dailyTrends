import cron from 'node-cron';
import {FeedRepository} from "src/infrastructure/repositories/FeedRepository/FeedRepository";
import {ScraperService} from "src/domain/services/ScraperService";
import {logger} from "src/utils/logger";

const repo = new FeedRepository();
const scraperService = new ScraperService(repo);

cron.schedule('0 7 * * *', async () => {
    logger.info('Ejecutando scraping diario...');
    await scraperService.scrapeAndStore();
}, {
    timezone: 'Europe/Madrid'
});