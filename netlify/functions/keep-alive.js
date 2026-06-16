const { createClient } = require('@supabase/supabase-js');
exports.handler = async () => {
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
  var { data, error } = await supabase.from('contacts').select('id').limit(1);
  return {
    statusCode: 200,
    body: JSON.stringify({ ping: 'ok', timestamp: new Date().toISOString() })
  };
};
