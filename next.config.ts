import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */ 
const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['api.qrserver.com'],
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'api.qrserver.com',
    //     port: '',
    //     pathname: '/v1/create-qr-code/**',
    //   },
    // ],
  },
};

export default nextConfig;
