/** @type {import('next').NextConfig} */

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
const assetPrefix = basePath ? basePath + "/" : ""

const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix,
}

module.exports = nextConfig
