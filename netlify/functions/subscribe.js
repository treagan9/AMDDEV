// netlify/functions/subscribe.js
var { createClient } = require('@supabase/supabase-js');
var { Resend } = require('resend');

var supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);
var resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' };

  try {
    var data = JSON.parse(event.body);
    if (!data.email) return { statusCode: 400, body: JSON.stringify({ error: 'Email required' }) };

    var existing = await supabase.from('email_subscribers').select('id, unsubscribed_at').eq('email', data.email.toLowerCase()).single();

    if (existing.data && !existing.data.unsubscribed_at) {
      return { statusCode: 200, body: JSON.stringify({ success: true, message: 'Already subscribed' }) };
    }

    if (existing.data && existing.data.unsubscribed_at) {
      await supabase.from('email_subscribers').update({ unsubscribed_at: null, first_name: data.first_name || null }).eq('id', existing.data.id);
    } else {
      await supabase.from('email_subscribers').insert({
        email: data.email.toLowerCase(),
        first_name: data.first_name || null,
        source: data.source || 'footer'
      });
    }

    var templateResult = await supabase.from('email_templates').select('subject_default, body_default').eq('slug', 'welcome').single();

    if (templateResult.data) {
      var body = templateResult.data.body_default.replace(/\{\{first_name\}\}/g, data.first_name || 'there');
      var subscriberResult = await supabase.from('email_subscribers').select('unsubscribe_token').eq('email', data.email.toLowerCase()).single();
      var unsubUrl = 'https://dev.answersmd.com/.netlify/functions/unsubscribe?token=' + (subscriberResult.data ? subscriberResult.data.unsubscribe_token : '');

      await fetch('https://dev.answersmd.com/.netlify/functions/send-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: data.email,
          subject: templateResult.data.subject_default,
          body: body,
          unsubscribe_url: unsubUrl
        })
      });
    }

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
