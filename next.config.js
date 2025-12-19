const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'trygg-bucket.s3.eu-north-1.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/cribio-db.appspot.com/**',
      },
    ],
  },

  reactStrictMode: true,
};

module.exports = nextConfig;
