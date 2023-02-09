module.exports = {
    images: {
        domains:[""]
    },
    experimental: {
        optimizeFonts: true,
    },
    env: {
        NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
    }
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  })
  module.exports = withBundleAnalyzer({})