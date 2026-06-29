// netlify/functions/unsubscribe.js
var { createClient } = require('@supabase/supabase-js');

var supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

exports.handler = async function (event) {
  var token = event.queryStringParameters ? event.queryStringParameters.token : null;

  if (!token) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'text/html' },
      body: '<html><body style="font-family:sans-serif;text-align:center;padding:60px;"><h2>Invalid link</h2><p>This unsubscribe link is not valid.</p></body></html>'
    };
  }

  var result = await supabase
    .from('email_subscribers')
    .update({ unsubscribed_at: new Date().toISOString() })
    .eq('unsubscribe_token', token)
    .is('unsubscribed_at', null);

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/html' },
    body: '<html><body style="font-family:-apple-system,sans-serif;text-align:center;padding:60px;background:#FAFAF7;"><div style="max-width:480px;margin:0 auto;background:white;border-radius:18px;padding:48px;border:1px solid #E8E2D8;"><h2 style="color:#2D2D2D;margin:0 0 12px 0;">Unsubscribed</h2><p style="color:#6B6560;line-height:1.7;">You have been removed from our mailing list. You will no longer receive marketing emails from AnswersMD.</p><p style="color:#9A9590;font-size:14px;margin-top:24px;">If this was a mistake, contact us at <a href="mailto:info@answersmd.com" style="color:#C4A265;">info@answersmd.com</a></p></div></body></html>'
  };
};
