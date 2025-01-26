import { redirect } from 'next/navigation'
import { createClient } from "@/lib/db/dbServer";
import logger from '@/lib/logger';

export default async function LogoutPage() {
    try {
        const client = await createClient();
        const { data: { user } } = await client.auth.getUser();
        const userId = user?.id;

        await client.auth.signOut();
        logger.info({ userId }, 'User logged out successfully');
        redirect('/?refresh=' + Date.now());
    } catch (error) {
        // Ignore redirect "errors" as they're expected behavior
        if (!error.digest?.startsWith('NEXT_REDIRECT')) {
            logger.error({ error }, 'Error during logout process');
            throw error;
        }
        throw error; // Let redirect error propagate
    }

    return (<></>);
}