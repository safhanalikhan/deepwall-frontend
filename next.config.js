/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["https://example.com/path-to-your-image.jpg"], // Replace with your image source domain
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
