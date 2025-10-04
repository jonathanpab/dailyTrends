import {Logger} from 'tslog';

export const logger = new Logger<string>({
    name: 'daily-trends-service',
    type: 'pretty',
    minLevel: 3,
    hideLogPositionForProduction: true,
});