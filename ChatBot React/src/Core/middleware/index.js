import { apiMiddleware } from 'redux-api-middleware';

import botMD from './botMD';

export default [apiMiddleware, botMD];