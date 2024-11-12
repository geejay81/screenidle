/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: 'export',
  crossOrigin: 'anonymous',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
      },
    ]
  }
};

export default nextConfig;
