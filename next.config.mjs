/** @type {import('next').NextConfig} */
const nextConfig = {};

if (typeof require !== "undefined") {
    require.extensions[".css"] = (file) => {}
  }
  
export default nextConfig;
