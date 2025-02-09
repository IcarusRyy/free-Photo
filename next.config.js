const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["antd"],
  images: {
    // disableStaticImages: true,
    // domains: ["cdn.goenhance.ai"],
  },
};

module.exports = withNextIntl(nextConfig);
