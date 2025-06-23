import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://s2.coinmarketcap.com/**'),
      new URL('https://yt3.googleusercontent.com/**'), 
      new URL('https://lh3.googleusercontent.com/**'),
      new URL('http://localhost:3000/**')
    ],
  },
};

export default nextConfig;
