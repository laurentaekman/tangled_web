/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["www.onlygfx.com", "images.metmuseum.org"],
  },
  async redirects() {
    return [
      {
        source: "/art-posts",
        destination: "/",
        permanent: true,
      },
    ];
  },
};
