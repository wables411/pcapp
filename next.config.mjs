/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.opensea.io',
      },
      {
        protocol: 'https',
        hostname: '**.opensea-static.com',
      },
      {
        protocol: 'https',
        hostname: '**.alchemy.com',
      },
      {
        protocol: 'https',
        hostname: '**.infura.io',
      },
    ],
  },
};

export default nextConfig;

