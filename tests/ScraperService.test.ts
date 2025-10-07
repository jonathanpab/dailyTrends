import {ScraperService} from 'src/domain/services/ScraperService';
import {FeedRepository} from 'src/infrastructure/repositories/FeedRepository/FeedRepository';
import {ElPaisScraper} from 'src/domain/scrappers/ElPaisScraper';
import {ElMundoScraper} from 'src/domain/scrappers/ElMundoScraper';

// mock all the functions because it will not be called in this test, each one has a specific test
jest.mock('src/infrastructure/repositories/FeedRepository/FeedRepository');
jest.mock('src/domain/scrappers/ElPaisScraper');
jest.mock('src/domain/scrappers/ElMundoScraper');

describe('ScraperService', () => {
    let repo: FeedRepository;
    let service: ScraperService;

    beforeEach(() => {
        repo = new FeedRepository();
        service = new ScraperService(repo);
    });

    it('should scrape and store news from all scrapers', async () => {
        const mockFeeds = [
            { title: 'Test Feed', url: 'https://example.com', description: 'desc', imageUrl: null, author: 'Author', source: 'El Mundo', publishedAt: new Date(), isManuallyAdded: false }
        ];

        (ElPaisScraper.prototype.fetch as jest.Mock).mockResolvedValue(mockFeeds);
        (ElMundoScraper.prototype.fetch as jest.Mock).mockResolvedValue(mockFeeds);
        (repo.createBatch as jest.Mock).mockResolvedValue(undefined);

        await service.scrapeAndStore();

        expect(ElPaisScraper.prototype.fetch).toHaveBeenCalled();
        expect(ElMundoScraper.prototype.fetch).toHaveBeenCalled();
        expect(repo.createBatch).toHaveBeenCalledTimes(2);
        expect(repo.createBatch).toHaveBeenCalledWith(mockFeeds);
    });
});
