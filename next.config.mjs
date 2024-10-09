import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
            protocol: 'https',
            hostname: 'lovely-flamingo-139.convex.cloud'
            },

            {
                protocol : 'https',
                hostname : "cautious-pigeon-77.convex.cloud"
            }


        ]
    }
};

export default nextConfig;
