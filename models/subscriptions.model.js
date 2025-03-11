import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minLength: 2,
        maxLength: 100,
    },
    price: {
        type: Number,
        required: [true, 'Subscription price is required'],
        min: [0, 'PRice must be greater than 0']
    },
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'GBP'],
        default: 'USD',
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'annually']
    },
    category: {
        type: String,
        enum: ['lifestyle','finance', 'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology', 'other'],
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active',
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start date must be before current date'
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: 'Start date must be after start date'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }

}, {timestamps: true});

subscriptionSchema.pre('save', function (next) {
    if (!this.renewalDate) {
        if (this.frequency === 'monthly') {
            // Set renewal date to the same day next month
            this.renewalDate = new Date(this.startDate);
            this.renewalDate.setMonth(this.renewalDate.getMonth() + 1);
        } else if (this.frequency === 'annually') {
            // Set renewal date to the same day next year
            this.renewalDate = new Date(this.startDate);
            this.renewalDate.setFullYear(this.renewalDate.getFullYear() + 1);
        } else {
            // For daily and weekly subscriptions, add fixed days
            const renewalPeriods = {
                daily: 1,
                weekly: 7,
            };

            this.renewalDate = new Date(this.startDate);
            if (renewalPeriods[this.frequency]) {
                this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
            }
        }
    }

    // Auto-update the status if renewal date has passed
    if (this.renewalDate < new Date()) {
        this.status = 'expired';
    }

    next();
});


const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;