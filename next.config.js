/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'www.worldometers.info'
      },
      {
        protocol: 'https',
        hostname: '*'
      }
    ],
  },
}

module.exports = nextConfig
