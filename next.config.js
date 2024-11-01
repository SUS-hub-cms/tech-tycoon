/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['firebasestorage.googleapis.com'],
    unoptimized: true
  },
  compress: true,
  eslint: {
    ignoreDuringBuilds: true // Temporarily ignore ESLint during builds
  },
  typescript: {
    ignoreBuildErrors: true // Temporarily ignore TypeScript errors during builds
  }
}

module.exports = nextConfig 