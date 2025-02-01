import path from 'path';
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve.alias['@'] = path.join(__dirname);
    return config;
  },
};

export default nextConfig;
