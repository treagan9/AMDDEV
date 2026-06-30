// netlify/functions/send-campaign.js
var { Resend } = require('resend');

var resend = new Resend(process.env.RESEND_API_KEY);

function buildEmail(subject, body, attachmentUrl, attachmentName, unsubscribeUrl) {
  var bodyHtml = body
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Convert double newlines to paragraph breaks
  var paragraphs = bodyHtml.split('\n\n');
  bodyHtml = paragraphs.map(function (p) {
    return '<p style="margin:0 0 18px 0;font-size:17px;line-height:1.8;color:#3D3832;font-family:Plus Jakarta Sans,-apple-system,sans-serif;">' + p.replace(/\n/g, '<br>') + '</p>';
  }).join('');

  // Convert "Schedule a consultation" or similar phrases to CTA buttons
  bodyHtml = bodyHtml.replace(
    /Schedule a (complimentary )?consultation/gi,
    function (match) {
      return '</p><table cellpadding="0" cellspacing="0" style="margin:8px 0 24px 0;"><tr><td>'
        + '<a href="https://dev.answersmd.com/contact/" style="display:inline-block;background:#1B3A34;color:#ffffff;padding:16px 36px;border-radius:8px;text-decoration:none;font-weight:600;font-size:16px;font-family:Plus Jakarta Sans,-apple-system,sans-serif;">' + match + '</a>'
        + '</td></tr></table><p style="margin:0 0 18px 0;font-size:17px;line-height:1.8;color:#3D3832;font-family:Plus Jakarta Sans,-apple-system,sans-serif;">';
    }
  );

  var attachmentHtml = '';
  if (attachmentUrl && attachmentName) {
    attachmentHtml = '<table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">'
      + '<tr><td style="background:#FAFAF7;border:1px solid #E8E2D8;border-radius:8px;padding:16px 20px;">'
      + '<a href="' + attachmentUrl + '" style="color:#1B3A34;font-weight:600;font-size:14px;text-decoration:none;font-family:Plus Jakarta Sans,-apple-system,sans-serif;">&#128206; ' + attachmentName + '</a>'
      + '</td></tr></table>';
  }

  return '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>'
    + '<body style="margin:0;padding:0;background:#FAFAF7;font-family:Plus Jakarta Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAF7;"><tr><td align="center" style="padding:32px 16px;">'
    + '<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">'

    // Hero image
    + '<tr><td style="padding:0;">'
    + '<img src="https://dev.answersmd.com/answersmd-sms-1200x630.png" alt="AnswersMD" style="width:100%;height:auto;display:block;border-radius:12px 12px 0 0;" />'
    + '</td></tr>'

    // Content
    + '<tr><td style="background:#ffffff;padding:44px 40px 32px 40px;border-left:1px solid #E8E2D8;border-right:1px solid #E8E2D8;">'
    + bodyHtml
    + attachmentHtml
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
