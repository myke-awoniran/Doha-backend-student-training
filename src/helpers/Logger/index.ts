import {LoggerFactory} from './LoggerFactory.js';
import chalk from 'chalk';

const Logger = LoggerFactory.configure({
    id: chalk.green('TRAVELBASE'),
    level: 'all'
});

export {Logger};
