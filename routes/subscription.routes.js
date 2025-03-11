import { Router } from 'express';
import authorize from '../middlewares/auth.middleware.js';
import { 
    createSubscription, 
    getUserSubscription, 
    getAllSubscriptions, 
    getSubscriptionById, 
    updateSubscription, 
    deleteSubscription, 
    cancelSubscription, 
    getUpcomingRenewals 
} from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();

subscriptionRouter.get('/', authorize, getAllSubscriptions);

subscriptionRouter.get('/upcoming-renewals', authorize, getUpcomingRenewals);

subscriptionRouter.get('/:id', authorize, getSubscriptionById);

subscriptionRouter.get('/user/:id', authorize, getUserSubscription);

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', authorize, updateSubscription);

subscriptionRouter.delete('/:id', authorize, deleteSubscription);

subscriptionRouter.put('/:id/cancel', authorize, cancelSubscription);

export default subscriptionRouter;
