import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/utils/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // remotePatterns: ['*.s3.ap-southeast-1.amazonaws.com', '*.s3.ap-southeast-1.amazonaws.com'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
      },
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  }
};

export default withNextIntl(nextConfig);
