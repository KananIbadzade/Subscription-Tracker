import dayjs from 'dayjs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { serve } = require('@upstash/workflow/express');
import Subscription from '../models/subscriptions.model.js';
import { sendReminderEmail } from '../utils/send-email.js';

const REMINDERS = [7, 5, 2, 1]

export const sendReminders = serve(async (context) => {
  try {
    const { subscriptionId } = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);

    if (!subscription || subscription.status !== 'active') {
      console.log(`Subscription ${subscriptionId} is either not found or not active.`);
      return;
    }

    const renewalDate = dayjs(subscription.renewalDate);
    const currentDate = dayjs();

    if (renewalDate.isBefore(currentDate, 'day')) {
      console.log(`Renewal date ${renewalDate.format()} has passed for subscription ${subscriptionId}. Stopping workflow.`);
      return;
    }

    // Loop through each reminder, using a stable currentDate snapshot.
    for (const daysBefore of REMINDERS) {
      const reminderDate = renewalDate.subtract(daysBefore, 'day');

      if (reminderDate.isAfter(currentDate, 'day')) {
        console.log(`Scheduling ${daysBefore} days before reminder at ${reminderDate.format()}`);
        await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate);
      }

      if (currentDate.isSame(reminderDate, 'day')) {
        console.log(`Triggering ${daysBefore} days before reminder for subscription ${subscriptionId}`);
        await triggerReminder(context, `${daysBefore} days before reminder`, subscription);
      }
    }
  } catch (error) {
    console.error(`Error in sendReminders workflow: ${error}`);
  }
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run('get subscription', async () => {
    return Subscription.findById(subscriptionId).populate('user', 'name email');
  });
}

const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} reminder at ${date.format()}`);
  await context.sleepUntil(label, date.toDate());
}

const triggerReminder = async (context, label, subscription) => {
  return await context.run(label, async () => {
    console.log(`Triggering ${label} reminder for subscription ${subscription.id}`);
    await sendReminderEmail({
      to: subscription.user.email,
      type: label,
      subscription,
    });
  });
}