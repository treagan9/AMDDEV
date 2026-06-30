// netlify/functions/submit-signup.js
var { createClient } = require('@supabase/supabase-js');
var { Resend } = require('resend');

var supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
var resend = new Resend(process.env.RESEND_API_KEY);

var COVERAGE_LABELS = { individual: 'Individual', couple: 'Couple', family: 'Family' };
var LOCATION_LABELS = { tampa: 'Tampa', 'st-pete': 'St. Petersburg', 'boca-raton': 'Boca Raton' };

function buildAdminEmail(data) {
  var cov = COVERAGE_LABELS[data.coverage] || data.coverage || 'Not selected';
  var loc = LOCATION_LABELS[data.location] || data.location || 'Not selected';
  var phoneRaw = (data.phone || '').replace(/\D/g, '');
  var phoneLink = phoneRaw ? '<a href="tel:' + phoneRaw + '" style="color:#C4A265;text-decoration:none;">' + data.phone + '</a>' : 'Not provided';
  var emailLink = '<a href="mailto:' + data.email + '" style="color:#C4A265;text-decoration:none;">' + data.email + '</a>';

  return '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>'
    + '<body style="margin:0;padding:0;background:#FAFAF7;font-family:Plus Jakarta Sans,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;">'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAF7;"><tr><td align="center" style="padding:32px 16px;">'
    + '<table width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;">'

    + '<tr><td style="background:#ffffff;padding:36px 32px 28px;border-radius:12px 12px 0 0;border:1px solid #E8E2D8;border-bottom:none;">'
    + '<p style="margin:0 0 4px 0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#C4A265;font-weight:600;">New membership signup</p>'
    + '<p style="margin:0 0 8px 0;font-size:22px;font-weight:700;color:#2D2D2D;font-family:Libre Baskerville,Georgia,serif;">' + data.firstName + ' ' + data.lastName + '</p>'
    + '<p style="margin:0 0 16px 0;font-size:15px;color:#5C5650;">' + emailLink + (data.phone ? ' &middot; ' + phoneLink : '') + '</p>'
    + '<span style="display:inline-block;background:#1B3A34;color:#ffffff;padding:5px 14px;font-size:12px;font-weight:600;border-radius:6px;">' + cov + '</span>'
    + '</td></tr>'

    + '<tr><td style="background:#ffffff;padding:24px 32px 28px;border:1px solid #E8E2D8;border-top:1px solid #F0EDE8;border-bottom:none;">'
    + '<table width="100%" cellpadding="0" cellspacing="0">'
    + '<tr><td style="padding:10px 0;border-bottom:1px solid #F0EDE8;"><span style="font-size:13px;color:#9A9590;display:inline-block;width:120px;">Membership</span><span style="font-size:14px;color:#2D2D2D;font-weight:500;">' + cov + '</span></td></tr>'
    + '<tr><td style="padding:10px 0;border-bottom:1px solid #F0EDE8;"><span style="font-size:13px;color:#9A9590;display:inline-block;width:120px;">Location</span><span style="font-size:14px;color:#2D2D2D;font-weight:500;">' + loc + '</span></td></tr>'
    + '<tr><td style="padding:10px 0;border-bottom:1px solid #F0EDE8;"><span style="font-size:13px;color:#9A9590;display:inline-block;width:120px;">Email</span><span style="font-size:14px;color:#2D2D2D;font-weight:500;">' + data.email + '</span></td></tr>'
    + '<tr><td style="padding:10px 0;"><span style="font-size:13px;color:#9A9590;display:inline-block;width:120px;">Phone</span><span style="font-size:14px;color:#2D2D2D;font-weight:500;">' + (data.phone || 'Not provided') + '</span></td></tr>'
    + '</table>'
    + '</td></tr>'

    + '<tr><td style="background:#ffffff;padding:16px 32px 24px;border:1px solid #E8E2D8;border-top:1px solid #F0EDE8;border-radius:0 0 12px 12px;">'
    + '<a href="https://dev.answersmd.com/answersmd-admin/patients/" style="display:inline-block;background:#1B3A34;color:#ffffff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">View in Pulse</a>'
    + '</td></tr>'

    + '<tr><td style="padding:20px 0 0;text-align:center;"><p style="margin:0;font-size:11px;color:#9A9590;">AnswersMD Pulse &middot; ' + new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + '</p></td></tr>'

    + '</table>'
    + '</td></tr></table>'
    + '</body></html>';
}

function buildClientEmail(firstName) {
  return '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>'
    + '<body style="margin:0;padding:0;background:#FAFAF7;font-family:Plus Jakarta Sans,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;">'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAF7;"><tr><td align="center" style="padding:32px 16px;">'
    + '<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">'

    // Hero
    + '<tr><td style="padding:0;">'
    + '<img src="https://dev.answersmd.com/social/home.png" alt="AnswersMD" style="width:100%;height:auto;display:block;border-radius:12px 12px 0 0;" />'
    + '</td></tr>'

    // Content
    + '<tr><td style="background:#ffffff;padding:44px 40px 36px 40px;border-left:1px solid #E8E2D8;border-right:1px solid #E8E2D8;">'

    + '<p style="margin:0 0 20px 0;font-size:17px;line-height:1.8;color:#3D3832;">Hi ' + firstName + ',</p>'

    + '<p style="margin:0 0 20px 0;font-size:17px;line-height:1.8;color:#3D3832;">Thank you for your interest in AnswersMD. We are excited to learn more about you and your healthcare goals.</p>'

    + '<p style="margin:0 0 8px 0;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#C4A265;font-weight:600;">What happens next</p>'

    + '<p style="margin:0 0 20px 0;font-size:17px;line-height:1.8;color:#3D3832;">A member of our team will review your information and reach out within one business day to schedule your complimentary consultation. During the call, we will discuss your health goals, answer any questions and help you decide if AnswersMD is the right fit.</p>'

    // CTA
    + '<table cellpadding="0" cellspacing="0" style="margin:8px 0 28px 0;"><tr><td>'
    + '<a href="https://dev.answersmd.com/contact/" style="display:inline-block;background:#1B3A34;color:#ffffff;padding:16px 36px;border-radius:8px;text-decoration:none;font-weight:600;font-size:16px;font-family:Plus Jakarta Sans,-apple-system,sans-serif;">Schedule a consultation</a>'
    + '</td></tr></table>'

    + '<p style="margin:0 0 4px 0;font-size:15px;color:#5C5650;">Questions in the meantime?</p>'
    + '<p style="margin:0;font-size:15px;">'
    + '<a href="tel:8137273233" style="color:#C4A265;text-decoration:none;font-weight:500;">813-727-3233</a>'
    + ' &middot; <a href="mailto:info@answersmd.com" style="color:#C4A265;text-decoration:none;font-weight:500;">info@answersmd.com</a></p>'

    + '</td></tr>'

    // Footer
    + '<tr><td style="background:#2A2A2A;padding:32px 40px;border-radius:0 0 12px 12px;">'
    + '<p style="margin:0 0 6px 0;font-size:15px;color:rgba(255,255,255,0.7);font-family:Plus Jakarta Sans,-apple-system,sans-serif;">AnswersMD</p>'
    + '<p style="margin:0 0 4px 0;font-size:13px;color:rgba(255,255,255,0.45);font-family:Plus Jakarta Sans,-apple-system,sans-serif;">Concierge Medicine, Simplified.</p>'
    + '<p style="margin:0 0 4px 0;font-size:13px;color:rgba(255,255,255,0.45);font-family:Plus Jakarta Sans,-apple-system,sans-serif;">Tampa &bull; St. Petersburg &bull; Boca Raton</p>'
    + '<p style="margin:0;font-size:13px;color:rgba(255,255,255,0.45);font-family:Plus Jakarta Sans,-apple-system,sans-serif;">'
    + '<a href="tel:8137273233" style="color:rgba(255,255,255,0.45);text-decoration:none;">813-727-3233</a>'
    + ' &bull; <a href="mailto:info@answersmd.com" style="color:rgba(255,255,255,0.45);text-decoration:none;">info@answersmd.com</a></p>'
    + '</td></tr>'

    + '</table>'
    + '</td></tr></table>'
    + '</body></html>';
}

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' };

  try {
    var data = JSON.parse(event.body);

    // Honeypot
    if (data.website && data.website.trim() !== '') {
      return { statusCode: 200, body: JSON.stringify({ success: true }) };
    }
    // Speed check
    if (data.formLoadedAt) {
      var elapsed = Date.now() - parseInt(data.formLoadedAt);
      if (elapsed < 2000) {
        return { statusCode: 200, body: JSON.stringify({ success: true }) };
      }
    }

    var cov = COVERAGE_LABELS[data.coverage] || data.coverage || 'Not selected';
    var loc = LOCATION_LABELS[data.location] || data.location || 'Not selected';

    // Insert lead
    var leadResult = await supabase.from('leads').insert({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone || null,
      location: data.location || null,
      interest: data.coverage || 'membership',
      message: 'Membership: ' + cov + ', Location: ' + loc,
      source: 'signup',
      status: 'new'
    }).select().single();

    var lead = leadResult.data;
    if (leadResult.error) console.error('Lead insert error:', leadResult.error);

    // Form snapshot
    await supabase.from('form_submissions').insert({
      form_type: 'signup',
      raw_payload: data,
      lead_id: lead ? lead.id : null,
      ip_address: event.headers['x-forwarded-for'] || event.headers['client-ip'] || null,
      user_agent: event.headers['user-agent'] || null
    });

    // Activity log
    await supabase.from('activity_log').insert({
      action: 'lead_created',
      entity_type: 'lead',
      entity_id: lead ? lead.id : null,
      details: { source: 'signup', name: data.firstName + ' ' + data.lastName, email: data.email, coverage: data.coverage, location: data.location }
    });

    // Admin notification
    await resend.emails.send({
      from: 'AnswersMD <noreply@answersmd.com>',
      to: ['info@answersmd.com'],
      bcc: ['admin@answersmd.com', 'blipscomb@gmail.com', 'bryan.lipscomb@answersmd.com', 'doug.shapiro@answersmd.com'],
      subject: 'New signup: ' + data.firstName + ' ' + data.lastName + ' (' + cov + ')',
      html: buildAdminEmail(data)
    });

    // Client confirmation
    await resend.emails.send({
      from: 'AnswersMD <noreply@answersmd.com>',
      to: [data.email],
      subject: 'Welcome to AnswersMD, ' + data.firstName,
      html: buildClientEmail(data.firstName)
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true })
    };
  } catch (err) {
    console.error('submit-signup error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};