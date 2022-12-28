const path = require("path")

// const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
// const assetPrefix = basePath ? basePath + "/" : ""

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  webpack: (config) => {
    config.experiments = config.experiments ?? {}
    config.experiments.topLevelAwait = true

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    })

    return config
  },
}

module.exports = nextConfig
