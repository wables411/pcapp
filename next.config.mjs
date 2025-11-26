import { createRequire } from 'module';

const require = createRequire(import.meta.url);

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
  webpack: (config, { isServer }) => {
    // Ensure single React version (fixes ReactCurrentBatchConfig errors)
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        react: require.resolve('react'),
        'react-dom': require.resolve('react-dom'),
        '@react-native-async-storage/async-storage': false,
        'pino-pretty': false,
      };
      config.resolve.fallback = {
        ...config.resolve.fallback,
        '@react-native-async-storage/async-storage': false,
        'pino-pretty': false,
      };
    }
    // Server-side: also ignore these modules
    if (isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        react: require.resolve('react'),
        'react-dom': require.resolve('react-dom'),
        '@react-native-async-storage/async-storage': false,
        'pino-pretty': false,
      };
      config.resolve.fallback = {
        ...config.resolve.fallback,
        '@react-native-async-storage/async-storage': false,
        'pino-pretty': false,
      };
    }
    return config;
  },
};

export default nextConfig;

