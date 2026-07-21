/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.1031exchangelosangeles.com'],
  },
  // Build optimizations
  swcMinify: true,
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    // Ensure the repo-root services/*.json rich-content files are included
    // in the serverless function bundle for the dynamic services route,
    // since fs.readFileSync with an interpolated path is not always
    // statically traceable by Vercel's file tracer.
    outputFileTracingIncludes: {
      '/services/[slug]': ['./services/*.json'],
    },
  },
  // Reduce bundle size
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Optimize webpack
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle splitting
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
        },
      };
    }
    return config;
  },
}

module.exports = nextConfig
