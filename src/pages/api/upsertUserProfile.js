import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, fullName } = req.body;

  if (!userId || !fullName) {
    return res.status(400).json({ error: 'Missing userId or fullName' });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .upsert({ auth_uid: userId, full_name: fullName }, { onConflict: 'auth_uid' });

    if (error) {
      console.error('Error upserting user profile:', error);
      return res.status(500).json({ error: 'Failed to upsert user profile' });
    }

    return res.status(200).json({ message: 'User profile upserted', data });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Unexpected error' });
  }
}
