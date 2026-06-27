const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' };
  try {
    const data = JSON.parse(event.body);

    if (data.website && data.website.trim() !== '') {
      return { statusCode: 200, body: JSON.stringify({ success: true }) };
    }
    if (data.formLoadedAt) {
      const elapsed = Date.now() - parseInt(data.formLoadedAt);
      if (elapsed < 2000) {
        return { statusCode: 200, body: JSON.stringify({ success: true }) };
      }
    }

    // Legacy signups table
    await supabase.from('signups').insert({
      first_name: data.firstName, last_name: data.lastName, email: data.email, phone: data.phone,
      coverage: data.coverage, experience: data.experience, care_history: data.careHistory || [],
      ideal: data.ideal, priorities: data.priorities || [], age_range: data.age,
      spouse_age: data.spouseAge || null, children_count: data.childrenCount || null,
      primary_price: data.primaryPrice, additional_price: data.additionalPrice, total_price: data.totalPrice
    });

    // New leads table
    const { data: lead, error: leadError } = await supabase.from('leads').insert({
      first_name: data.firstName, last_name: data.lastName, email: data.email,
      phone: data.phone || null, location: null,
      interest: data.coverage || 'membership',
      message: 'Coverage: ' + (data.coverage || 'N/A') + ', Experience: ' + (data.experience || 'N/A') + ', Age: ' + (data.age || 'N/A'),
      source: 'signup', status: 'new'
    }).select().single();

    if (leadError) console.error('Lead insert error:', leadError);

    // Form submission snapshot
    await supabase.from('form_submissions').insert({
      form_type: 'signup',
      raw_payload: data,
      lead_id: lead ? lead.id : null,
      ip_address: event.headers['x-forwarded-for'] || event.headers['client-ip'] || null,
      user_agent: event.headers['user-agent'] || null
    });

    // Activity log
    await supabase.from('activity_log').insert({
      action: 'lead_created', entity_type: 'lead', entity_id: lead ? lead.id : null,
      details: { source: 'signup', name: data.firstName + ' ' + data.lastName, email: data.email, coverage: data.coverage }
    });

    var cov = { individual: 'Individual', couple: 'Couple', family: 'Family' }[data.coverage] || data.coverage;
    var exp = { current: 'Currently has concierge doctor', past: 'Had one previously', first: 'First time' }[data.experience] || data.experience;
    var ideal = { fast: 'Fast access', preventive: 'Preventive care', managed: 'Big picture management', personal: 'Doctor who knows them' }[data.ideal] || data.ideal;
    var chLabels = { primary: 'Primary care', urgent: 'Urgent care', er: 'ER', hospital: 'Hospital', specialist: 'Specialist', telehealth: 'Telehealth', none: 'None in past year' };
    var prLabels = { 'same-day': 'Same-day appts', direct: 'Direct access', unrushed: 'Unrushed visits', longevity: 'Longevity planning', coordination: 'Specialist coordination', flexible: 'Flexible care' };
    var careHtml = (data.careHistory || []).map(function(c) { return chLabels[c] || c; }).join(', ');
    var prioHtml = (data.priorities || []).map(function(p) { return prLabels[p] || p; }).join(', ');
    var phoneRaw = (data.phone || '').replace(/\D/g, '');
    var phoneLink = phoneRaw ? '<a href="tel:' + phoneRaw + '" style="color:#C4A265;text-decoration:none;">' + data.phone + '</a>' : 'Not provided';
    var emailLink = '<a href="mailto:' + data.email + '" style="color:#C4A265;text-decoration:none;">' + data.email + '</a>';
    var d = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    var famRows = '';
    if (data.coverage !== 'individual') {
      famRows = '<tr><td style="padding:10px 0;border-bottom:1px solid #F0EDE8;color:#6B6560;font-size:13px;width:35%;">Spouse Age</td><td style="padding:10px 0;border-bottom:1px solid #F0EDE8;color:#2D2D2D;font-weight:500;font-size:14px;">' + (data.spouseAge || 'N/A') + '</td></tr>';
      if (data.coverage === 'family') {
        famRows += '<tr><td style="padding:10px 0;border-bottom:1px solid #F0EDE8;color:#6B6560;font-size:13px;">Children</td><td style="padding:10px 0;border-bottom:1px solid #F0EDE8;color:#2D2D2D;font-weight:500;font-size:14px;">' + (data.childrenCount || 'N/A') + '</td></tr>';
      }
    }

    // Admin notification
    var adminHtml = '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>'
      + '<body style="margin:0;padding:0;background:#FAFAF7;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;">'
      + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAF7;padding:32px 16px;"><tr><td align="center">'
      + '<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">'
      + '<tr><td align="center" style="padding-bottom:24px;"><img src="https://answersmd01.netlify.app/logo-dark.png" alt="AnswersMD" height="32" style="height:32px;" /></td></tr>'
      + '<tr><td style="background:#FFFFFF;border-radius:18px;border:1px solid #E8E2D8;overflow:hidden;">'
      + '<tr><td style="padding:32px 32px 24px;border-bottom:1px solid #E8E2D8;">'
      + '<p style="margin:0 0 4px;font-size:12px;color:#C4A265;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;">New Membership Signup</p>'
      + '<h1 style="margin:0 0 8px;font-family:Georgia,serif;font-size:24px;font-weight:700;color:#2D2D2D;">' + data.firstName + ' ' + data.lastName + '</h1>'
      + '<p style="margin:0 0 12px;font-size:15px;color:#6B6560;">' + emailLink + (data.phone ? ' &middot; ' + phoneLink : '') + '</p>'
      + '<span style="display:inline-block;background:#1B3A34;color:#FFFFFF;padding:6px 16px;font-size:13px;font-weight:500;border-radius:6px;">' + cov + '</span>'
      + '</td></tr>'
      + '<tr><td style="padding:24px 32px;">'
      + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">'
      + '<tr><td style="padding:10px 0;border-bottom:1px solid #F0EDE8;color:#6B6560;font-size:13px;width:35%;">Coverage</td><td style="padding:10px 0;border-bottom:1px solid #F0EDE8;color:#2D2D2D;font-weight:500;font-size:14px;">' + cov + '</td></tr>'
      + '<tr><td style="padding:10px 0;border-bottom:1px solid #F0EDE8;color:#6B6560;font-size:13px;">Age Range</td><td style="padding:10px 0;border-bottom:1px solid #F0EDE8;color:#2D2D2D;font-weight:500;font-size:14px;">' + (data.age || 'N/A') + '</td></tr>'
      + famRows
      + '<tr><td style="padding:10px 0;border-bottom:1px solid #F0EDE8;color:#6B6560;font-size:13px;">Experience</td><td style="padding:10px 0;border-bottom:1px solid #F0EDE8;color:#2D2D2D;font-weight:500;font-size:14px;">' + exp + '</td></tr>'
      + '<tr><td style="padding:10px 0;border-bottom:1px solid #F0EDE8;color:#6B6560;font-size:13px;">Recent Care</td><td style="padding:10px 0;border-bottom:1px solid #F0EDE8;color:#2D2D2D;font-weight:500;font-size:14px;">' + (careHtml || 'None') + '</td></tr>'
      + '<tr><td style="padding:10px 0;border-bottom:1px solid #F0EDE8;color:#6B6560;font-size:13px;">Ideal Healthcare</td><td style="padding:10px 0;border-bottom:1px solid #F0EDE8;color:#2D2D2D;font-weight:500;font-size:14px;">' + ideal + '</td></tr>'
      + '<tr><td style="padding:10px 0;color:#6B6560;font-size:13px;">Priorities</td><td style="padding:10px 0;color:#2D2D2D;font-weight:500;font-size:14px;">' + (prioHtml || 'None') + '</td></tr>'
      + '</table></td></tr>'
      + '<tr><td style="padding:16px 32px 24px;"><a href="https://answersmd01.netlify.app/answersmd-admin/leads/" style="display:inline-block;background:#1B3A34;color:#FFFFFF;font-size:14px;font-weight:500;text-decoration:none;padding:12px 28px;border-radius:8px;">View in Pulse</a></td></tr>'
      + '</table></td></tr>'
      + '<tr><td align="center" style="padding-top:24px;"><p style="margin:0;font-size:11px;color:#9A9590;">AnswersMD Pulse &middot; ' + d + '</p></td></tr>'
      + '</table></td></tr></table></body></html>';

    await resend.emails.send({
      from: 'AnswersMD <requests@answersmd.com>',
      to: ['info@answersmd.com'],
      bcc: ['admin@answersmd.com', 'blipscomb@gmail.com', 'bryan.lipscomb@answersmd.com', 'doug.shapiro@answersmd.com'],
      subject: 'New Signup from ' + data.firstName + ' ' + data.lastName + ' (' + cov + ')',
      html: adminHtml
    });

    // Client confirmation
    var clientHtml = '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>'
      + '<body style="margin:0;padding:0;background:#FAFAF7;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;">'
      + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAF7;padding:48px 16px;"><tr><td align="center">'
      + '<table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;">'
      + '<tr><td align="center" style="padding-bottom:32px;"><img src="https://answersmd01.netlify.app/logo-dark.png" alt="AnswersMD" height="36" style="height:36px;" /></td></tr>'
      + '<tr><td style="background:#FFFFFF;border-radius:18px;border:1px solid #E8E2D8;padding:48px 40px;">'
      + '<h1 style="margin:0 0 8px;font-family:Georgia,serif;font-size:24px;font-weight:700;color:#2D2D2D;text-align:center;">Welcome, ' + data.firstName + '</h1>'
      + '<p style="margin:0 0 32px;font-size:16px;color:#6B6560;text-align:center;line-height:1.6;">Thank you for your interest in AnswersMD. We\'re excited to learn more about you and your healthcare goals.</p>'
      + '<div style="background:#FAFAF7;border-radius:12px;padding:24px;margin-bottom:32px;">'
      + '<p style="margin:0 0 12px;font-size:13px;color:#C4A265;font-weight:600;letter-spacing:1px;text-transform:uppercase;">What happens next</p>'
      + '<p style="margin:0 0 8px;font-size:15px;color:#2D2D2D;line-height:1.6;">A member of our team will review your information and reach out within one business day to schedule your complimentary consultation.</p>'
      + '<p style="margin:0;font-size:15px;color:#2D2D2D;line-height:1.6;">During the consultation, we\'ll discuss your health goals, answer any questions and help you decide if AnswersMD is the right fit.</p>'
      + '</div>'
      + '<div style="text-align:center;margin-bottom:24px;">'
      + '<p style="margin:0 0 4px;font-size:14px;color:#6B6560;">Questions in the meantime?</p>'
      + '<p style="margin:0;font-size:15px;"><a href="tel:8137273233" style="color:#C4A265;text-decoration:none;font-weight:500;">813-727-3233</a> &middot; <a href="mailto:info@answersmd.com" style="color:#C4A265;text-decoration:none;font-weight:500;">info@answersmd.com</a></p>'
      + '</div>'
      + '<p style="margin:0;font-size:14px;color:#9A9590;text-align:center;">We look forward to meeting you.</p>'
      + '</td></tr>'
      + '<tr><td align="center" style="padding-top:32px;">'
      + '<p style="margin:0 0 4px;font-size:12px;color:#9A9590;">AnswersMD</p>'
      + '<p style="margin:0;font-size:12px;color:#9A9590;">Tampa &middot; St. Petersburg &middot; Boca Raton</p>'
      + '</td></tr></table></td></tr></table></body></html>';

    await resend.emails.send({
      from: 'AnswersMD <noreply@answersmd.com>',
      to: [data.email],
      subject: 'Welcome to AnswersMD, ' + data.firstName,
      html: clientHtml
    });

    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error('Function error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error' }) };
  }
};
