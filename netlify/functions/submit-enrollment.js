const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' };
  try {
    const data = JSON.parse(event.body);

    // Store enrollment intent (no payment processing yet)
    const { error: dbError } = await supabase.from('enrollments').insert({
      full_name: data.fullName,
      email: data.email,
      phone: data.phone || null,
      address: data.address || null,
      city: data.city || null,
      state: data.state || null,
      zip: data.zip || null,
      primary_price: data.primaryPrice || 0,
      additional_price: data.additionalPrice || 0,
      total_price: data.totalPrice || 0,
      status: 'pending'
    });

    if (dbError) { console.error('DB error:', dbError); return { statusCode: 500, body: JSON.stringify({ error: 'DB error' }) }; }

    var d = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    var t = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    var total = (data.totalPrice || 0).toLocaleString();

    var html = '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;background:#faf8f5;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;"><div style="max-width:600px;margin:0 auto;padding:40px 20px;">'
      + '<div style="background:#2a3f3b;padding:32px;text-align:center;"><h1 style="color:#fff;font-size:20px;margin:0;font-weight:400;letter-spacing:2px;">ANSWERSMD</h1><p style="color:#b89b5d;font-size:12px;margin:8px 0 0;letter-spacing:3px;text-transform:uppercase;">New Enrollment Intent</p></div>'
      + '<div style="background:#fff;padding:32px;border-left:4px solid #b89b5d;"><h2 style="color:#2a3f3b;font-size:24px;margin:0 0 4px;font-weight:500;">' + data.fullName + '</h2><p style="color:#6b6560;font-size:14px;margin:0 0 16px;">' + data.email + (data.phone ? ' &middot; ' + data.phone : '') + '</p><div style="display:inline-block;background:#b89b5d;color:#fff;padding:8px 20px;font-size:14px;font-weight:600;">READY TO ENROLL &middot; $' + total + '/year</div></div>'
      + '<div style="background:#fff4e6;padding:20px 32px;margin-top:2px;border-left:4px solid #e6a817;"><p style="color:#8a6d3b;font-size:14px;margin:0;font-weight:500;">&#9888; Payment not yet processed. Stripe integration pending. Contact this member to complete enrollment manually.</p></div>'
      + '<div style="background:#fff;padding:24px 32px;margin-top:2px;"><h3 style="color:#2a3f3b;font-size:14px;text-transform:uppercase;letter-spacing:2px;margin:0 0 16px;border-bottom:1px solid #e8e4de;padding-bottom:12px;">Billing Details</h3><table style="width:100%;border-collapse:collapse;"><tr><td style="padding:12px 16px;border-bottom:1px solid #e8e4de;color:#6b6560;font-size:14px;width:35%;">Name</td><td style="padding:12px 16px;border-bottom:1px solid #e8e4de;color:#2a3f3b;font-weight:500;font-size:14px;">' + data.fullName + '</td></tr><tr><td style="padding:12px 16px;border-bottom:1px solid #e8e4de;color:#6b6560;font-size:14px;">Email</td><td style="padding:12px 16px;border-bottom:1px solid #e8e4de;color:#2a3f3b;font-weight:500;font-size:14px;"><a href="mailto:' + data.email + '" style="color:#b89b5d;">' + data.email + '</a></td></tr><tr><td style="padding:12px 16px;border-bottom:1px solid #e8e4de;color:#6b6560;font-size:14px;">Phone</td><td style="padding:12px 16px;border-bottom:1px solid #e8e4de;color:#2a3f3b;font-weight:500;font-size:14px;">' + (data.phone || 'Not provided') + '</td></tr><tr><td style="padding:12px 16px;border-bottom:1px solid #e8e4de;color:#6b6560;font-size:14px;">Address</td><td style="padding:12px 16px;border-bottom:1px solid #e8e4de;color:#2a3f3b;font-weight:500;font-size:14px;">' + (data.address || '') + '<br>' + (data.city || '') + ', ' + (data.state || '') + ' ' + (data.zip || '') + '</td></tr></table></div>'
      + '<div style="background:#fff;padding:24px 32px;margin-top:2px;"><h3 style="color:#2a3f3b;font-size:14px;text-transform:uppercase;letter-spacing:2px;margin:0 0 16px;border-bottom:1px solid #e8e4de;padding-bottom:12px;">Membership Pricing</h3><table style="width:100%;border-collapse:collapse;"><tr><td style="padding:8px 0;color:#6b6560;font-size:14px;">Primary Member</td><td style="padding:8px 0;color:#2a3f3b;font-weight:600;font-size:14px;text-align:right;">$' + (data.primaryPrice || 0).toLocaleString() + '</td></tr>' + (data.additionalPrice > 0 ? '<tr><td style="padding:8px 0;color:#6b6560;font-size:14px;">Additional Members</td><td style="padding:8px 0;color:#2a3f3b;font-weight:600;font-size:14px;text-align:right;">$' + (data.additionalPrice || 0).toLocaleString() + '</td></tr>' : '') + '<tr style="border-top:2px solid #2a3f3b;"><td style="padding:12px 0 0;color:#2a3f3b;font-size:16px;font-weight:600;">Total Annual</td><td style="padding:12px 0 0;color:#b89b5d;font-weight:700;font-size:18px;text-align:right;">$' + total + '</td></tr></table></div>'
      + '<div style="text-align:center;padding:24px;color:#a09890;font-size:12px;"><p style="margin:0;">AnswersMD Enrollment Intent &middot; ' + d + ' at ' + t + '</p></div></div></body></html>';

    await resend.emails.send({
      from: 'AnswersMD <requests@answersmd.com>',
      to: ['admin@answersmd.com', 'info@answersmd.com', 'blipscomb@gmail.com', 'bryan.lipscomb@answersmd.com'],
      subject: '🔴 Enrollment · ' + data.fullName + ' · $' + total + '/yr · Action Required',
      html: html
    });

    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error('Function error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error' }) };
  }
};