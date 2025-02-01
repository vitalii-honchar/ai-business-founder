import { createBrowserClient } from '@supabase/ssr'


export const createClient = () => {
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
};

export async function getUserId() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  return !data?.user?.id ? null : data.user.id;
}