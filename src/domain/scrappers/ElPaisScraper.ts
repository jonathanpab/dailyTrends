import {BaseScraper} from 'src/domain/scrappers/BaseScraper';
import {IFeed} from 'src/domain/models/IFeed';
import * as cheerio from 'cheerio';

export class ElPaisScraper extends BaseScraper {
    url = 'https://elpais.com/';
    source = 'El País';

    protected extractFeeds($: cheerio.CheerioAPI): IFeed[] {
        const feeds: IFeed[] = [];
        const articles = $('article');
        let count = 0;

        for (let i = 0; i < articles.length && count < 5; i++) {
            const el = articles[i];
            const $el = $(el);

            const url = $el.find('a').attr('href');

            const match = url?.match(/\/(\d{4}-\d{2}-\d{2})\//);
            const publishedAt = match ? new Date(match[1]) : undefined;
            if (!publishedAt || !this.isToday(publishedAt)) {
                continue;
            }

            const title = $el.find('h2').text().trim();
            const description = $el.find('p').text().trim();
            const imageUrl = $el.find('img').attr('src') || null;
            const author = $el.find('.c_a_a').first().text().trim() || null;

            if (title && url && description) {
                feeds.push({
                    title,
                    url,
                    description,
                    imageUrl,
                    author,
                    source: this.source,
                    publishedAt,
                    isManuallyAdded: false
                });
                count++;
            }
        }

        return feeds;
    }
}
