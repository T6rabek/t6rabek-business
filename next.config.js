/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    domains: ['placehold.co', 'images.unsplash.com'], // Add domains for placeholder images
  },
};

module.exports = nextConfig;
