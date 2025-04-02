import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images:{
        domains: ["placehold.co", "static.wixstatic.com"]
    },
    output: 'standalone',
};

export default nextConfig;
