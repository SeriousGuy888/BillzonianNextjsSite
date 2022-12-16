const path = require("path")

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
const assetPrefix = basePath ? basePath + "/" : ""

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
}

module.exports = nextConfig
