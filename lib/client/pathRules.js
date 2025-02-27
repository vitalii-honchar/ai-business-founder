import { headers } from 'next/headers';

// List of paths that should bypass subscription check
export const BYPASS_PATHS = [
    '/application/user-profile/subscription',
    '/application/user-profile/subscription/checkout',
    '/application/auth/logout'
];

/**
 * Gets the current pathname from headers and checks if it should bypass subscription check
 * @returns {Object} Object containing pathname and shouldBypass flag
 */
export async function getPathAndBypassStatus() {
    const headersList = await headers();
    const pathname = headersList.get('x-pathname') || '';
    const shouldBypass = BYPASS_PATHS.some(path => pathname.startsWith(path));
    
    return { pathname, shouldBypass };
}

/**
 * Checks if the given pathname should bypass subscription check
 * @param {string} pathname - The current pathname
 * @returns {boolean} Whether the path should bypass subscription check
 */
export function shouldBypassCheck(pathname) {
    return BYPASS_PATHS.some(path => pathname.startsWith(path));
} 