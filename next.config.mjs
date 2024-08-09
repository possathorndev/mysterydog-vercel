import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/utils/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mystery-dog.s3.ap-southeast-1.amazonaws.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
