// netlify/functions/send-campaign.js
var { Resend } = require('resend');

var resend = new Resend(process.env.RESEND_API_KEY);

function buildEmail(subject, body, attachmentUrl, attachmentName, unsubscribeUrl) {
  var ctaMatch = body.match(/Schedule a (consultation|complimentary consultation)/i);
  var ctaText = ctaMatch ? ctaMatch[0] : '';
  var ctaUrl = 'https://dev.answersmd.com/contact/';

  var bodyHtml = body
    .replace(/\n\n/g, '</p><p style="margin:0 0 16px 0;font-size:16px;line-height:1.8;color:#4A4540;">')
    .replace(/\n/g, '<br>');

  if (ctaText) {
    bodyHtml = bodyHtml.replace(
      ctaText,
      '<a href="' + ctaUrl + '" style="display:inline-block;background:#1B3A34;color:#ffffff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:16px;margin:8px 0;">' + ctaText + '</a>'
    );
  }

  var attachmentHtml = '';
  if (attachmentUrl && attachmentName) {
    attachmentHtml = '<table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;"><tr><td style="background:#FAFAF7;border:1px solid #E8E2D8;border-radius:8px;padding:16px 20px;"><a href="' + attachmentUrl + '" style="color:#1B3A34;font-weight:600;font-size:14px;text-decoration:none;">\uD83D\uDCCE ' + attachmentName + '</a></td></tr></table>';
  }

  return '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head><body style="margin:0;padding:0;background:#FAFAF7;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAF7;"><tr><td align="center" style="padding:32px 16px;">'
    + '<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">'
    + '<tr><td style="padding:0 0 0 0;">'
    + '<img src="https://dev.answersmd.com/answersmd-sms-1200x630.png" alt="AnswersMD" style="width:100%;height:auto;display:block;border-radius:12px 12px 0 0;" />'
    + '</td></tr>'
    + '<tr><td style="background:#ffffff;padding:40px 40px 32px 40px;border-left:1px solid #E8E2D8;border-right:1px solid #E8E2D8;">'
    + '<p style="margin:0 0 16px 0;font-size:16px;line-height:1.8;color:#4A4540;">' + bodyHtml + '</p>'
    + attachmentHtml
    + '</td></tr>'
    + '<tr><td style="background:#2A2A2A;padding:32px 40px;border-radius:0 0 12px 12px;">'
    + '<p style="margin:0 0 8px 0;font-size:14px;color:rgba(255,255,255,0.7);">AnswersMD \u2022 Concierge Medicine, Simplified.</p>'
    + '<p style="margin:0 0 4px 0;font-size:13px;color:rgba(255,255,255,0.5);">Tampa \u2022 St. Petersburg \u2022 Boca Raton</p>'
    + '<p style="margin:0 0 4px 0;font-size:13px;color:rgba(255,255,255,0.5);"><a href="tel:8137273233" style="color:rgba(255,255,255,0.5);text-decoration:none;">813-727-3233</a> \u2022 <a href="mailto:info@answersmd.com" style="color:rgba(255,255,255,0.5);text-decoration:none;">info@answersmd.com</a></p>'
    + '<p style="margin:16px 0 0 0;font-size:12px;"><a href="' + (unsubscribeUrl || '#') + '" style="color:rgba(255,255,255,0.35);text-decoration:underline;">Unsubscribe</a></p>'
    + '</td></tr>'
    + '</table>'
    + '</td></tr></table>'
    + '</body></html>';
}

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' };

  try {
    var data = JSON.parse(event.body);
    var html = buildEmail(
      data.subject,
      data.body,
      data.attachment_url || null,
      data.attachment_name || null,
      data.unsubscribe_url || null
    );

    var result = await resend.emails.send({
      from: 'AnswersMD <noreply@answersmd.com>',
      to: data.to,
      subject: data.subject,
      html: html
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, id: result.data ? result.data.id : null })
    };
  } catch (err) {
    console.error('send-campaign error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message })
    };
  }
};
