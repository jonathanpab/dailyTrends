import {IFeed} from "src/domain/models/IFeed";
import {ElPaisScraper} from "src/domain/scrappers/ElPaisScraper";
import {ElMundoScraper} from "src/domain/scrappers/ElMundoScraper";

describe('Scraper Tests', () => {

    const validateFeeds = (feeds: IFeed[], source: string) => {
        expect(feeds).toBeDefined();
        expect(Array.isArray(feeds)).toBe(true);
        expect(feeds.length).toBe(5);

        feeds.forEach((feed) => {
            expect(feed.title).toBeDefined();
            expect(feed.title).not.toEqual('');
            expect(feed.url).toMatch(/^https?:\/\/.+/);
            expect(feed.description).toBeDefined();
            expect(feed.description).not.toEqual('');
            expect(feed.source).toBe(source);
            expect(feed.publishedAt).toBeInstanceOf(Date);
        });
    };

    test('ElPaisScraper should return 5 valid articles with description', async () => {
        const scraper = new ElPaisScraper();
        const feeds = await scraper.fetch();
        validateFeeds(feeds, 'El País');
    });

    test('ElMundoScraper should return 5 valid articles with description', async () => {
        const scraper = new ElMundoScraper();
        const feeds = await scraper.fetch();
        validateFeeds(feeds, 'El Mundo');
    });
});
