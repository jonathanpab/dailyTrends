import express from 'express';
import {FeedController} from '../controllers/FeedController';

const router = express.Router();
const controller = new FeedController();

router.get('/', controller.getTodayTopFeeds.bind(controller));
router.post('/', controller.createManualFeed.bind(controller));
router.delete('/:id', controller.deleteFeed.bind(controller));

export default router;