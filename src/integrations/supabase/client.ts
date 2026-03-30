import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wiektajetbbnejurnazd.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_Bm4kv3NZZGmCOwlNtIC0Kg_s5O5wKPo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
