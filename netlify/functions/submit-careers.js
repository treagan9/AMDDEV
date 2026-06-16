const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' };
  try {
    const data = JSON.parse(event.body);

    // ── Spam prevention ───────────────────────────────────────
    if (data.website && data.website.trim() !== '') {
      console.log('Spam rejected: honeypot filled');
      return { statusCode: 200, body: JSON.stringify({ success: true }) };
    }
    if (data.formLoadedAt) {
      const elapsed = Date.now() - parseInt(data.formLoadedAt);
      if (elapsed < 2000) {
        console.log('Spam rejected: submitted in ' + elapsed + 'ms');
        return { statusCode: 200, body: JSON.stringify({ success: true }) };
      }
    }

    const { error: dbError } = await supabase.from('careers').insert({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone || null,
      position: data.position || null,
      message: data.cover || null,
      resume_url: data.linkedin || null
    });

    if (dbError) { console.error('DB error:', dbError); return { statusCode: 500, body: JSON.stringify({ error: 'DB error' }) }; }

    var posLabels = {
      'medical-assistant': 'Medical Assistant',
      'patient-coordinator': 'Patient Coordinator',
      'rn': 'Registered Nurse',
      'office-manager': 'Office Manager',
      'other': 'Other / General Interest'
    };
    var pos = posLabels[data.position] || data.position || 'Not specified';
    var d = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    var t = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    var phoneRaw = (data.phone || '').replace(/\D/g, '');
    var phoneLink = phoneRaw ? '<a href="tel:' + phoneRaw + '" style="color:#b89b5d;text-decoration:none;">' + data.phone + '</a>' : 'Not provided';
    var emailLink = '<a href="mailto:' + data.email + '" style="color:#b89b5d;text-decoration:none;">' + data.email + '</a>';
    var linkedinLink = data.linkedin ? '<a href="' + data.linkedin + '" style="color:#b89b5d;text-decoration:none;">View Profile</a>' : '';

    var html = '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>'
      + 'body{margin:0;padding:0;background:#faf8f5;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;-webkit-text-size-adjust:100%;}'
      + '.wrap{max-width:600px;margin:0 auto;padding:24px 16px;}'
      + '.card{background:#fff;margin-bottom:2px;}'
      + '.header{background:#2a3f3b;padding:28px 24px;text-align:center;}'
      + '.header h1{color:#fff;font-size:18px;margin:0;font-weight:400;letter-spacing:2px;}'
      + '.header p{color:#b89b5d;font-size:11px;margin:8px 0 0;letter-spacing:2.5px;text-transform:uppercase;}'
      + '.hero{padding:24px;border-left:4px solid #b89b5d;}'
      + '.hero h2{color:#2a3f3b;font-size:22px;margin:0 0 6px;font-weight:500;line-height:1.3;}'
      + '.hero p{color:#6b6560;font-size:14px;margin:0 0 14px;line-height:1.5;}'
      + '.chip{display:inline-block;background:#2a3f3b;color:#fff;padding:8px 16px;font-size:13px;font-weight:500;border-radius:4px;}'
      + '.section{padding:20px 24px;}'
      + '.section h3{color:#2a3f3b;font-size:12px;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 12px;border-bottom:1px solid #e8e4de;padding-bottom:10px;font-weight:600;}'
      + '.row{display:table;width:100%;border-bottom:1px solid #f0ece5;}'
      + '.row:last-child{border-bottom:none;}'
      + '.row .k{display:table-cell;padding:10px 0;color:#6b6560;font-size:13px;width:35%;}'
      + '.row .v{display:table-cell;padding:10px 0;color:#2a3f3b;font-weight:500;font-size:13px;word-break:break-word;}'
      + '.msg{padding:18px;background:#faf8f5;border-left:3px solid #b89b5d;color:#2a3f3b;font-size:14px;line-height:1.7;margin-top:4px;}'
      + '.foot{text-align:center;padding:20px;color:#a09890;font-size:11px;}'
      + '@media (max-width:480px){'
      + '.wrap{padding:12px 0;}'
      + '.hero{padding:20px 18px;}'
      + '.hero h2{font-size:20px;}'
      + '.section{padding:18px;}'
      + '.row .k{width:40%;font-size:12px;}'
      + '.row .v{font-size:12px;}'
      + '}'
      + '</style></head><body>'
      + '<div class="wrap">'
      + '<div class="card header"><h1>ANSWERSMD</h1><p>New Career Application</p></div>'
      + '<div class="card hero"><h2>' + data.firstName + ' ' + data.lastName + '</h2>'
      + '<p>' + emailLink + (data.phone ? ' &middot; ' + phoneLink : '') + '</p>'
      + '<span class="chip">' + pos + '</span></div>'
      + '<div class="card section"><h3>Applicant Details</h3>'
      + '<div class="row"><div class="k">Name</div><div class="v">' + data.firstName + ' ' + data.lastName + '</div></div>'
      + '<div class="row"><div class="k">Email</div><div class="v">' + emailLink + '</div></div>'
      + '<div class="row"><div class="k">Phone</div><div class="v">' + phoneLink + '</div></div>'
      + '<div class="row"><div class="k">Position</div><div class="v">' + pos + '</div></div>'
      + (data.linkedin ? '<div class="row"><div class="k">LinkedIn</div><div class="v">' + linkedinLink + '</div></div>' : '')
      + '</div>'
      + (data.cover ? '<div class="card section"><h3>Cover Letter</h3><div class="msg">' + data.cover.replace(/\n/g, '<br>') + '</div></div>' : '')
      + '<div class="foot">AnswersMD Career Application &middot; ' + d + ' at ' + t + '</div>'
      + '</div></body></html>';

    await resend.emails.send({
      from: 'AnswersMD <requests@answersmd.com>',
      to: ['info@answersmd.com'],
      bcc: ['admin@answersmd.com', 'blipscomb@gmail.com', 'bryan.lipscomb@answersmd.com'],
      subject: '🔵 New Applicant · ' + data.firstName + ' ' + data.lastName + ' · ' + pos,
      html: html
    });

    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error('Function error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error' }) };
  }
};