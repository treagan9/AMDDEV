// netlify/functions/subscribe.js
var { createClient } = require('@supabase/supabase-js');
var { Resend } = require('resend');

var supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);
var resend = new Resend(process.env.RESEND_API_KEY);

function buildWelcomeEmail(firstName, unsubscribeUrl) {
  var name = firstName || 'there';
  return '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>'
    + '<body style="margin:0;padding:0;background:#FAFAF7;font-family:Plus Jakarta Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAF7;"><tr><td align="center" style="padding:32px 16px;">'
    + '<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">'

    // Hero image
    + '<tr><td style="padding:0;">'
    + '<img src="https://dev.answersmd.com/answersmd-sms-1200x630.png" alt="AnswersMD" style="width:100%;height:auto;display:block;border-radius:12px 12px 0 0;" />'
    + '</td></tr>'

    // Content
    + '<tr><td style="background:#ffffff;padding:44px 40px 36px 40px;border-left:1px solid #E8E2D8;border-right:1px solid #E8E2D8;">'

    + '<p style="margin:0 0 20px 0;font-size:17px;line-height:1.8;color:#3D3832;">Hi ' + name + ',</p>'

    + '<p style="margin:0 0 20px 0;font-size:17px;line-height:1.8;color:#3D3832;">Thank you for joining the AnswersMD community. We are glad you are here.</p>'

    + '<p style="margin:0 0 20px 0;font-size:17px;line-height:1.8;color:#3D3832;">Here is what you can expect from us:</p>'

    + '<table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px 0;"><tr><td style="padding:0;">'
    + '<table cellpadding="0" cellspacing="0" style="margin:0 0 12px 0;"><tr>'
    + '<td style="width:24px;vertical-align:top;padding-top:4px;"><div style="width:8px;height:8px;border-radius:50%;background:#C4A265;margin-top:6px;"></div></td>'
    + '<td style="font-size:16px;line-height:1.7;color:#3D3832;">Physician-written wellness insights and health tips</td>'
    + '</tr></table>'
    + '<table cellpadding="0" cellspacing="0" style="margin:0 0 12px 0;"><tr>'
    + '<td style="width:24px;vertical-align:top;padding-top:4px;"><div style="width:8px;height:8px;border-radius:50%;background:#C4A265;margin-top:6px;"></div></td>'
    + '<td style="font-size:16px;line-height:1.7;color:#3D3832;">Practice updates and membership availability</td>'
    + '</tr></table>'
    + '<table cellpadding="0" cellspacing="0" style="margin:0 0 12px 0;"><tr>'
    + '<td style="width:24px;vertical-align:top;padding-top:4px;"><div style="width:8px;height:8px;border-radius:50%;background:#C4A265;margin-top:6px;"></div></td>'
    + '<td style="font-size:16px;line-height:1.7;color:#3D3832;">Early access to events and new services</td>'
    + '</tr></table>'
    + '</td></tr></table>'

    + '<p style="margin:0 0 28px 0;font-size:17px;line-height:1.8;color:#3D3832;">We keep things brief and only reach out when we have something worth sharing. No spam. Ever.</p>'

    + '<p style="margin:0 0 28px 0;font-size:17px;line-height:1.8;color:#3D3832;">If you are considering concierge medicine for yourself or your family, we would love to connect. Schedule a complimentary consultation to learn more about our approach.</p>'

    // CTA Button
    + '<table cellpadding="0" cellspacing="0" style="margin:0 0 8px 0;"><tr><td>'
    + '<a href="https://dev.answersmd.com/contact/" style="display:inline-block;background:#1B3A34;color:#ffffff;padding:16px 36px;border-radius:8px;text-decoration:none;font-weight:600;font-size:16px;font-family:Plus Jakarta Sans,-apple-system,sans-serif;">Schedule a consultation</a>'
    + '</td></tr></table>'

    + '</td></tr>'

    // Footer
    + '<tr><td style="background:#2A2A2A;padding:32px 40px;border-radius:0 0 12px 12px;">'
    + '<p style="margin:0 0 6px 0;font-size:15px;color:rgba(255,255,255,0.7);font-family:Plus Jakarta Sans,-apple-system,sans-serif;">AnswersMD</p>'
    + '<p style="margin:0 0 4px 0;font-size:13px;color:rgba(255,255,255,0.45);font-family:Plus Jakarta Sans,-apple-system,sans-serif;">Concierge Medicine, Simplified.</p>'
    + '<p style="margin:0 0 4px 0;font-size:13px;color:rgba(255,255,255,0.45);font-family:Plus Jakarta Sans,-apple-system,sans-serif;">Tampa &bull; St. Petersburg &bull; Boca Raton</p>'
    + '<p style="margin:0 0 4px 0;font-size:13px;color:rgba(255,255,255,0.45);font-family:Plus Jakarta Sans,-apple-system,sans-serif;">'
    + '<a href="tel:8137273233" style="color:rgba(255,255,255,0.45);text-decoration:none;">813-727-3233</a>'
    + ' &bull; <a href="mailto:info@answersmd.com" style="color:rgba(255,255,255,0.45);text-decoration:none;">info@answersmd.com</a></p>'
    + '<p style="margin:20px 0 0 0;font-size:12px;font-family:Plus Jakarta Sans,-apple-system,sans-serif;">'
    + '<a href="' + (unsubscribeUrl || 'https://dev.answersmd.com') + '" style="color:rgba(255,255,255,0.3);text-decoration:underline;">Unsubscribe</a></p>'
    + '</td></tr>'

    + '</table>'
    + '</td></tr></table>'
    + '</body></html>';
}

function buildAdminNotification(firstName, email, source) {
  return '<!DOCTYPE html><html><head><meta charset="utf-8"></head>'
    + '<body style="margin:0;padding:0;background:#FAFAF7;font-family:Plus Jakarta Sans,-apple-system,sans-serif;">'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAF7;"><tr><td align="center" style="padding:32px 16px;">'
    + '<table width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;">'
    + '<tr><td style="background:#ffffff;padding:36px 32px;border-radius:12px;border:1px solid #E8E2D8;">'
    + '<p style="margin:0 0 4px 0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#C4A265;font-weight:600;">New subscriber</p>'
    + '<p style="margin:0 0 20px 0;font-size:22px;font-weight:700;color:#2D2D2D;font-family:Libre Baskerville,Georgia,serif;">Someone joined the list</p>'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px 0;">'
    + '<tr><td style="padding:12px 0;border-bottom:1px solid #F0EDE8;"><span style="font-size:13px;color:#9A9590;display:inline-block;width:80px;">Name</span><span style="font-size:15px;color:#2D2D2D;font-weight:500;">' + (firstName || 'Not provided') + '</span></td></tr>'
    + '<tr><td style="padding:12px 0;border-bottom:1px solid #F0EDE8;"><span style="font-size:13px;color:#9A9590;display:inline-block;width:80px;">Email</span><span style="font-size:15px;color:#2D2D2D;font-weight:500;">' + email + '</span></td></tr>'
    + '<tr><td style="padding:12px 0;"><span style="font-size:13px;color:#9A9590;display:inline-block;width:80px;">Source</span><span style="font-size:15px;color:#2D2D2D;font-weight:500;">' + (source || 'Footer') + '</span></td></tr>'
    + '</table>'
    + '<a href="https://dev.answersmd.com/answersmd-admin/patients/" style="display:inline-block;background:#1B3A34;color:#ffffff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">View in admin</a>'
    + '</td></tr>'
    + '</table>'
    + '</td></tr></table>'
    + '</body></html>';
}

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' };

  try {
    var data = JSON.parse(event.body);
    if (!data.email) return { statusCode: 400, body: JSON.stringify({ error: 'Email required' }) };

    var emailLower = data.email.toLowerCase().trim();
    var firstName = (data.first_name || '').trim();
    var source = data.source || 'footer';

    // Check if already subscribed
    var existing = await supabase
      .from('email_subscribers')
      .select('id, unsubscribed_at')
      .eq('email', emailLower)
      .single();

    if (existing.data && !existing.data.unsubscribed_at) {
      return { statusCode: 200, body: JSON.stringify({ success: true, message: 'Already subscribed' }) };
    }

    // Re-subscribe or create new
    if (existing.data && existing.data.unsubscribed_at) {
      await supabase
        .from('email_subscribers')
        .update({ unsubscribed_at: null, first_name: firstName || null })
        .eq('id', existing.data.id);
    } else {
      await supabase
        .from('email_subscribers')
        .insert({ email: emailLower, first_name: firstName || null, source: source });
    }

    // Get unsubscribe token
    var subResult = await supabase
      .from('email_subscribers')
      .select('unsubscribe_token')
      .eq('email', emailLower)
      .single();

    var unsubscribeUrl = 'https://dev.answersmd.com/.netlify/functions/unsubscribe?token=' + (subResult.data ? subResult.data.unsubscribe_token : '');

    // Send welcome email to subscriber
    await resend.emails.send({
      from: 'AnswersMD <noreply@answersmd.com>',
      to: emailLower,
      subject: 'Welcome to AnswersMD',
      html: buildWelcomeEmail(firstName, unsubscribeUrl)
    });

    // Send admin notification
    var adminEmail = process.env.ADMIN_EMAIL || 'admin@answersmd.com';
    await resend.emails.send({
      from: 'AnswersMD <noreply@answersmd.com>',
      to: adminEmail,
      subject: 'New subscriber: ' + (firstName ? firstName + ' - ' : '') + emailLower,
      html: buildAdminNotification(firstName, emailLower, source)
    });

    // Log to activity
    await supabase.from('activity_log').insert({
      action: 'subscriber_added',
      entity_type: 'email_subscriber',
      details: { email: emailLower, first_name: firstName, source: source }
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true })
    };
  } catch (err) {
    console.error('subscribe error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
