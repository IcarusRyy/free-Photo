const withNextIntl = require("next-intl/plugin")("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["antd"],
  images: {
    // disableStaticImages: true,
    domains: ["cdn.goenhance.ai"],
  },
};

module.exports = withNextIntl(nextConfig);
