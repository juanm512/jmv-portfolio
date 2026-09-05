const createNextIntlPlugin = require("next-intl/plugin")

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "cdn.simpleicons.org",
        pathname: "/**",
        protocol: "https"
      }
    ]
  }
}

module.exports = withNextIntl(nextConfig)
