import * as cheerio from 'cheerio';
import {IFeed} from 'src/domain/models/IFeed';
import {BaseScraper} from "src/domain/scrappers/BaseScraper";

export class ElMundoScraper extends BaseScraper {
    url = 'https://elmundo.es/';
    source = 'El Mundo';

    protected extractFeeds($: cheerio.CheerioAPI): IFeed[] {
        const coverArticles = $('article.ue-c-cover-content');
        const feeds: IFeed[] = [];
        let count = 0;

        for (let i = 0; i < coverArticles.length && count < 5; i++) {
            const el = coverArticles[i];
            const $el = $(el);

            const url = $el.find('.ue-c-cover-content__link').attr('href');
            const match = url?.match(/\/(\d{4})\/(\d{2})\/(\d{2})\//);
            const publishedAt = match ? new Date(`${match[1]}-${match[2]}-${match[3]}`) : undefined;

            if (!publishedAt || !this.isToday(publishedAt)) {
                continue;
            }

            const title = $el.find('.ue-c-cover-content__headline').text().trim();
            const imageUrl = $el.find('img.ue-c-cover-content__image').attr('src') || null;
            const author = $el.find('.ue-c-cover-content__byline-name').first().text().trim() || null;
            const description = title;

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
