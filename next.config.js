/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["antd"],
  images: {
    disableStaticImages: true,
  },
};

module.exports = nextConfig;
