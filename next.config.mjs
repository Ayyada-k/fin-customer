/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/fin-customer', //If you want to deploy under a subpath, set the basePath here.
  experimental: {
    instrumentationHook: true,
  },
};

export default nextConfig;
