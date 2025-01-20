/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/app/dashboard',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
