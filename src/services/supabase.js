import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://lodqzkfgzkaylswtbbki.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvZHF6a2ZnemtheWxzd3RiYmtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc2NjAwNTQsImV4cCI6MjAyMzIzNjA1NH0.7DmC8xwN5oB_3Kbvmv6LWqGM9BIctZAS29uNWNcZSUU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
