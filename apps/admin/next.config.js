/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui", "@repo/db", "@repo/auth"],
  async rewrites() {
    return [
      {
        source: "/dashboard",
        destination: "/",
      },
    ];
  },
};

export default nextConfig;
