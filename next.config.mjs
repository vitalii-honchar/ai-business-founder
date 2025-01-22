/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/application/dashboard',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
