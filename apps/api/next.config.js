/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/db", "@repo/auth", "@repo/validators"],
};

export default nextConfig;
