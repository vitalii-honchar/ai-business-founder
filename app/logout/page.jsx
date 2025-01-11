import { redirect } from 'next/navigation'
import { createClient } from "@/lib/db/dbServer";

export default async function LogoutPage() {
    const client = await createClient();
    client.auth.signOut();
    redirect('/');

    return (<></>);
}