/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['firebasestorage.googleapis.com'], // If you're using Firebase Storage for images
  },
  experimental: {
    optimizeFonts: true,
    modern: true,
    optimizeImages: true,
  },
  compress: true,
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
}

module.exports = nextConfig 