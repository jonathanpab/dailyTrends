import {IFeed} from 'src/domain/models/IFeed';
import * as cheerio from 'cheerio';
import axios from 'axios';
import {logger} from 'src/utils/logger';

export abstract class BaseScraper {
    abstract source: string;
    abstract url: string;

    async fetch(): Promise<IFeed[]> {
        try {
            const response = await axios.get(this.url);
            const html = response.data;
            const $ = cheerio.load(html);
            return this.extractFeeds($);
        } catch (error) {
            logger.error(`Error fetching from ${this.source} at ${this.url}:`, error);
            return [];
        }
    }

    protected isToday(date: Date): boolean {
        const now = new Date();
        return (
            date.getUTCFullYear() === now.getUTCFullYear() &&
            date.getUTCMonth() === now.getUTCMonth() &&
            date.getUTCDate() === now.getUTCDate()
        );
    }

    protected abstract extractFeeds($: cheerio.CheerioAPI): IFeed[];
}