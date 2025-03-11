import Subscription from '../models/subscriptions.model.js';
import {workflowClient} from '../config/upstash.js';
import {SERVER_URL} from '../config/env.js';

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });

        const { workflowRunId } = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: subscription.id,
              },
            headers: {
                'Content-Type': 'application/json',
            },
            retries: 0
          });               

        res.status(201).json({ success: true, data: subscription, workflowRunId });
    } catch (e) {
        next(e);
    }
} 

export const getUserSubscription = async (req, res, next) => {
    try {
        // checking if the user is the same as the one in token
        if (req.user._id.toString() !== req.params.id) {
            const error = new Error('You are not the owner of this account');
            error.status = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({ user: req.params.id });

        res.status(200).json({ success: true, data: subscriptions });

    } catch (e) {
        next(e);
    }
}

export const getAllSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find();

        res.status(200).json({ success: true, data: subscriptions });
    } catch (e) {
        next(e);
    }
}

export const getSubscriptionById = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            const error = new Error('Subscription not found');
            error.status = 404;
            throw error;
        }

        res.status(200).json({ success: true, data: subscription });
    } catch (e) {
        next(e);
    }
}

export const updateSubscription = async (req, res, next) => {
    try {
        let subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            return res.status(404).json({ success: false, error: 'Subscription not found' });
        }

        if (subscription.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ success: false, error: 'Unauthorized' });
        }

        subscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json({ success: true, data: subscription });
    } catch (e) {
        next(e);
    }
}

export const deleteSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            return res.status(404).json({ success: false, error: 'Subscription not found' });
        }

        if (subscription.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ success: false, error: 'Unauthorized' });
        }

        await Subscription.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, message: 'Subscription deleted successfully' });
    } catch (e) {
        next(e);
    }
}

export const cancelSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            return res.status(404).json({ success: false, error: 'Subscription not found' });
        }

        if (subscription.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ success: false, error: 'Unauthorized' });
        }

        subscription.status = 'cancelled';
        await subscription.save();

        res.status(200).json({ success: true, message: 'Subscription cancelled successfully' });
    } catch (e) {
        next(e);
    }
}

export const getUpcomingRenewals = async (req, res, next) => {
    try {
        const today = new Date();
        const next7Days = new Date();
        next7Days.setDate(today.getDate() + 7);

        const subscriptions = await Subscription.find({
            user: req.user._id,  // Ensure it filters by the logged-in user
            renewalDate: { $gte: today, $lte: next7Days },
            status: 'active',
        });

        res.status(200).json({ success: true, data: subscriptions });

    } catch (error) {
        next(error);
    }
}
    