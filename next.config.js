const createNextIntlPlugin = require("next-intl/plugin")
const withMDX = require("@next/mdx")()

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: []
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"]
}

module.exports = withNextIntl(withMDX(nextConfig))
