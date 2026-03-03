const createNextIntlPlugin = require("next-intl/plugin")
const withMDX = require("@next/mdx")()

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        hostname: "https://cdn.simpleicons.org/",
        pathname: "/**",
        protocol: "https",
      }
    ]
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"]
}

module.exports = withNextIntl(withMDX(nextConfig))
