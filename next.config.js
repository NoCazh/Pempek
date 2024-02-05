/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  images: {
    domains: ["brpyxajwqfuscdecllej.supabase.co", "bit.ly"],
  },
};

module.exports = nextConfig;
