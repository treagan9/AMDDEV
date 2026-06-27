const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' };
  try {
    const data = JSON.parse(event.body);

    // Legacy enrollments table
    await supabase.from('enrollments').insert({
      full_name: data.fullName, email: data.email, phone: data.phone || null,
      address: data.address || null, city: data.city || null, state: data.state || null, zip: data.zip || null,
      primary_price: data.primaryPrice || 0, additional_price: data.additionalPrice || 0,
      total_price: data.totalPrice || 0, status: 'pending'
    });

    // Split name for leads table
    var nameParts = (data.fullName || '').split(' ');
    var firstName = nameParts[0] || '';
    var lastName = nameParts.slice(1).join(' ') || '';

    // New leads table
    const { data: lead } = await supabase.from('leads').insert({
      first_name: firstName, last_name: lastName, email: data.email,
      phone: data.phone || null, location: data.city || null,
      interest: 'enrollment',
      message: 'Enrollment intent. Total: $' + ((data.totalPrice || 0).toLocaleString()) + '/year',
      source: 'signup', status: 'new'
    }).select().single();

    // Form submission snapshot
    await supabase.from('form_submissions').insert({
      form_type: 'signup', raw_payload: data,
      lead_id: lead ? lead.id : null,
      ip_address: event.headers['x-forwarded-for'] || null,
      user_agent: event.headers['user-agent'] || null
    });

    await supabase.from('activity_log').insert({
      action: 'lead_created', entity_type: 'lead', entity_id: lead ? lead.id : null,
      details: { source: 'enrollment', name: data.fullName, email: data.email }
    });

    var d = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    var t = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    var total = (data.totalPrice || 0).toLocaleString();

    // Admin notification
    var adminHtml = '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>'
      + '<body style="margin:0;padding:0;background:#FAFAF7;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;">'
      + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAF7;padding:32px 16px;"><tr><td align="center">'
      + '<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">'
      + '<tr><td align="center" style="padding-bottom:24px;"><img src="https://answersmd01.netlify.app/logo-dark.png" alt="AnswersMD" height="32" style="height:32px;" /></td></tr>'
      + '<tr><td style="background:#FFFFFF;border-radius:18px;border:1px solid #E8E2D8;overflow:hidden;">'
      + '<tr><td style="padding:32px;border-bottom:1px solid #E8E2D8;">'
      + '<p style="margin:0 0 4px;font-size:12px;color:#C4A265;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;">Enrollment Intent</p>'
      + '<h1 style="margin:0 0 8px;font-family:Georgia,serif;font-size:24px;font-weight:700;color:#2D2D2D;">' + data.fullName + '</h1>'
      + '<p style="margin:0 0 12px;font-size:15px;color:#6B6560;">' + data.email + (data.phone ? ' &middot; ' + data.phone : '') + '</p>'
      + '<span style="display:inline-block;background:#C4A265;color:#FFFFFF;padding:6px 16px;font-size:13px;font-weight:600;border-radius:6px;">$' + total + '/year</span>'
      + '</td></tr>'
      + '<tr><td style="padding:20px 32px;background:#FFF8ED;border-bottom:1px solid #E8E2D8;">'
      + '<p style="margin:0;font-size:14px;color:#8A6D3B;font-weight:500;">Action required: Payment not yet processed. Contact this member to complete enrollment.</p>'
      + '</td></tr>'
      + '<tr><td style="padding:24px 32px;">'
      + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">'
      + '<tr><td style="padding:10px 0;border-bottom:1px solid #F0EDE8;color:#6B6560;font-size:13px;width:35%;">Name</td><td style="padding:10px 0;border-bottom:1px solid #F0EDE8;color:#2D2D2D;font-weight:500;font-size:14px;">' + data.fullName + '</td></tr>'
      + '<tr><td style="padding:10px 0;border-bottom:1px solid #F0EDE8;color:#6B6560;font-size:13px;">Email</td><td style="padding:10px 0;border-bottom:1px solid #F0EDE8;color:#2D2D2D;font-weight:500;font-size:14px;">' + data.email + '</td></tr>'
      + '<tr><td style="padding:10px 0;border-bottom:1px solid #F0EDE8;color:#6B6560;font-size:13px;">Phone</td><td style="padding:10px 0;border-bottom:1px solid #F0EDE8;color:#2D2D2D;font-weight:500;font-size:14px;">' + (data.phone || 'Not provided') + '</td></tr>'
      + '<tr><td style="padding:10px 0;border-bottom:1px solid #F0EDE8;color:#6B6560;font-size:13px;">Address</td><td style="padding:10px 0;border-bottom:1px solid #F0EDE8;color:#2D2D2D;font-weight:500;font-size:14px;">' + (data.address || '') + ', ' + (data.city || '') + ', ' + (data.state || '') + ' ' + (data.zip || '') + '</td></tr>'
      + '<tr><td style="padding:10px 0;color:#6B6560;font-size:13px;">Submitted</td><td style="padding:10px 0;color:#2D2D2D;font-weight:500;font-size:14px;">' + d + ' at ' + t + '</td></tr>'
      + '</table></td></tr>'
      + '<tr><td style="padding:16px 32px 24px;"><a href="https://answersmd01.netlify.app/answersmd-admin/leads/" style="display:inline-block;background:#1B3A34;color:#FFFFFF;font-size:14px;font-weight:500;text-decoration:none;padding:12px 28px;border-radius:8px;">View in Pulse</a></td></tr>'
      + '</table></td></tr>'
      + '<tr><td align="center" style="padding-top:24px;"><p style="margin:0;font-size:11px;color:#9A9590;">AnswersMD Pulse &middot; ' + d + '</p></td></tr>'
      + '</table></td></tr></table></body></html>';

    await resend.emails.send({
      from: 'AnswersMD <requests@answersmd.com>',
      to: ['admin@answersmd.com', 'info@answersmd.com'],
      bcc: ['blipscomb@gmail.com', 'bryan.lipscomb@answersmd.com'],
      subject: 'Enrollment Intent from ' + data.fullName + ' ($' + total + '/yr)',
      html: adminHtml
    });

    // Client confirmation
    var clientHtml = '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>'
      + '<body style="margin:0;padding:0;background:#FAFAF7;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;">'
      + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAF7;padding:48px 16px;"><tr><td align="center">'
      + '<table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;">'
      + '<tr><td align="center" style="padding-bottom:32px;"><img src="https://answersmd01.netlify.app/logo-dark.png" alt="AnswersMD" height="36" style="height:36px;" /></td></tr>'
      + '<tr><td style="background:#FFFFFF;border-radius:18px;border:1px solid #E8E2D8;padding:48px 40px;">'
      + '<h1 style="margin:0 0 8px;font-family:Georgia,serif;font-size:24px;font-weight:700;color:#2D2D2D;text-align:center;">Thank you, ' + firstName + '</h1>'
      + '<p style="margin:0 0 32px;font-size:16px;color:#6B6560;text-align:center;line-height:1.6;">We received your enrollment request and our team is reviewing it now.</p>'
      + '<div style="background:#FAFAF7;border-radius:12px;padding:24px;margin-bottom:32px;">'
      + '<p style="margin:0 0 12px;font-size:13px;color:#C4A265;font-weight:600;letter-spacing:1px;text-transform:uppercase;">What happens next</p>'
      + '<p style="margin:0 0 8px;font-size:15px;color:#2D2D2D;line-height:1.6;">A team member will contact you within one business day to finalize your enrollment and walk you through the onboarding process.</p>'
      + '<p style="margin:0;font-size:15px;color:#2D2D2D;line-height:1.6;">We\'ll schedule your comprehensive welcome visit and pair you with your dedicated physician.</p>'
      + '</div>'
      + '<div style="text-align:center;margin-bottom:24px;">'
      + '<p style="margin:0 0 4px;font-size:14px;color:#6B6560;">Questions in the meantime?</p>'
      + '<p style="margin:0;font-size:15px;"><a href="tel:8137273233" style="color:#C4A265;text-decoration:none;font-weight:500;">813-727-3233</a> &middot; <a href="mailto:info@answersmd.com" style="color:#C4A265;text-decoration:none;font-weight:500;">info@answersmd.com</a></p>'
      + '</div>'
      + '<p style="margin:0;font-size:14px;color:#9A9590;text-align:center;">Welcome to the AnswersMD family.</p>'
      + '</td></tr>'
      + '<tr><td align="center" style="padding-top:32px;">'
      + '<p style="margin:0 0 4px;font-size:12px;color:#9A9590;">AnswersMD</p>'
      + '<p style="margin:0;font-size:12px;color:#9A9590;">Tampa &middot; St. Petersburg &middot; Boca Raton</p>'
      + '</td></tr></table></td></tr></table></body></html>';

    await resend.emails.send({
      from: 'AnswersMD <noreply@answersmd.com>',
      to: [data.email],
      subject: 'Your AnswersMD enrollment is being processed',
      html: clientHtml
    });

    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error('Function error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error' }) };
  }
};
