/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
}

export default nextConfig
