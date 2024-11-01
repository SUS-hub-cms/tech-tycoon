/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['firebasestorage.googleapis.com'],
    unoptimized: true
  },
  compress: true,
}

module.exports = nextConfig 