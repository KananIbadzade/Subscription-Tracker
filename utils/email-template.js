export const generateEmailTemplate = ({
  userName,
  subscriptionName,
  renewalDate,
  planName,
  price,
  paymentMethod,
  accountSettingsLink,
  supportLink,
  daysLeft,
}) => `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7f9fc;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);">
        <tr>
            <td style="background: linear-gradient(135deg, #4a90e2, #357abd); text-align: center; padding: 35px;">
                <p style="font-size: 50px; line-height: 1; font-weight: bold; color: #ffffff; margin: 0; text-shadow: 1px 1px 3px rgba(0,0,0,0.3);">SubDub</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 35px 30px;">                
                <p style="font-size: 18px; margin-bottom: 20px;">Hello <strong style="color: #4a90e2; font-size: 20px;">${userName}</strong>,</p>
                
                <p style="font-size: 16px; margin-bottom: 20px;">Your <strong style="color: #4a90e2;">${subscriptionName}</strong> subscription is set to renew on <strong style="color: #4a90e2;">${renewalDate}</strong> (${daysLeft} days from today).</p>
                
                <table cellpadding="15" cellspacing="0" border="0" width="100%" style="background-color: #f0f7ff; border-radius: 10px; margin-bottom: 25px; box-shadow: 0 3px 8px rgba(74,144,226,0.1);">
                    <tr>
                        <td style="font-size: 16px; border-bottom: 1px solid #d0e3ff;">
                            <strong style="color: #357abd;">Plan:</strong> ${planName}
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px; border-bottom: 1px solid #d0e3ff;">
                            <strong style="color: #357abd;">Price:</strong> ${price}
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px;">
                            <strong style="color: #357abd;">Payment Method:</strong> ${paymentMethod}
                        </td>
                    </tr>
                </table>
                
                <p style="font-size: 16px; margin-bottom: 20px;">If you'd like to make changes or cancel your subscription, please visit your <a href="${accountSettingsLink}" style="color: #4a90e2; text-decoration: none; font-weight: bold;">account settings</a> before the renewal date.</p>
                
                <p style="font-size: 16px; margin-bottom: 20px;">Need help? <a href="${supportLink}" style="color: #4a90e2; text-decoration: none; font-weight: bold;">Contact our support</a> anytime.</p>
                
                <p style="font-size: 16px; margin-top: 30px;">
                    Best regards,<br>
                    <strong style="color: #357abd;">SubDub</strong>
                </p>
            </td>
        </tr>
        <tr>
            <td style="background: linear-gradient(to right, #f0f7ff, #e6f0ff); padding: 20px; text-align: center; font-size: 13px;">
                <p style="margin: 0 0 10px; color: #666;">
                    SubDub Inc. | 148 E William St, San Jose, CA 95112
                </p>
                <p style="margin: 0;">
                    <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px; font-weight: 500;">Unsubscribe</a> | 
                    <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px; font-weight: 500;">Privacy Policy</a> | 
                    <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px; font-weight: 500;">Terms of Service</a>
                </p>
            </td>
        </tr>
    </table>
</div>
`;

export const emailTemplates = [
{
  label: "7 days before reminder",
  generateSubject: (data) =>
    `📅 Reminder: Your ${data.subscriptionName} Subscription Renews in 7 Days!`,
  generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 7 }),
},
{
  label: "5 days before reminder",
  generateSubject: (data) =>
    `⏳ ${data.subscriptionName} Renews in 5 Days – Stay Subscribed!`,
  generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 5 }),
},
{
  label: "2 days before reminder",
  generateSubject: (data) =>
    `🚀 2 Days Left! ${data.subscriptionName} Subscription Renewal`,
  generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 2 }),
},
{
  label: "1 days before reminder",
  generateSubject: (data) =>
    `⚡ Final Reminder: ${data.subscriptionName} Renews Tomorrow!`,
  generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 1 }),
},
];