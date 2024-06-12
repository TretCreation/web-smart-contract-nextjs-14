/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY,
    DEFAULT_CONTRACT_ADDRESS: process.env.DEFAULT_CONTRACT_ADDRESS,
    DEFAULT_URL: process.env.DEFAULT_URL,
    DEFAULT_ETHERSCAN_API_URL: process.env.DEFAULT_ETHERSCAN_API_URL,
    NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID
  },
  webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  }
}

export default nextConfig
