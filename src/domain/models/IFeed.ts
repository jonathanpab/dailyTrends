export interface IFeed {
    title: string;
    description?: string | null;
    imageUrl?: string | null;
    author?: string | null;
    url: string;
    source: string;
    publishedAt?: Date;
    isManuallyAdded?: boolean;
}