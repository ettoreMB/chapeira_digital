/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  pageExtensions: ['.ts', 'tsx'],
  output: 'standalone',
}

module.exports = nextConfig
