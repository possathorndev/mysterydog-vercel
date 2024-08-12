import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/utils/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // to be removed
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
      },
      {
        // to be removed
        protocol: 'https',
        hostname: '*',
      },
      {
        protocol: 'https',
        hostname: 'mystery-dog.s3.ap-southeast-1.amazonaws.com',
        // OR
        // hostname: '*.s3.ap-southeast-1.amazonaws.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
