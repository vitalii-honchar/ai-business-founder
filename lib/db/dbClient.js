import { createBrowserClient } from '@supabase/ssr'


export const createClient = () => {
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
};

export async function getUserId() {
  const supabase = createClient();
  const resp = await supabase.auth.getUser();
  return resp.data?.user?.id;
}