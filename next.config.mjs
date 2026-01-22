/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "logo.clearbit.com",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      // Keep Polish URLs as-is (no rewrite needed, just pass through).
      { source: "/pl", destination: "/pl" },
      { source: "/pl/:path*", destination: "/pl/:path*" },

      // Canonical EN URLs (no /en prefix) are served from internal /en/*.
      { source: "/", destination: "/en" },
      { source: "/me", destination: "/en/me" },
      { source: "/cv", destination: "/en/cv" },
      { source: "/projects", destination: "/en/projects" },
      { source: "/projects/:slug", destination: "/en/projects/:slug" },
      { source: "/portfolio", destination: "/en/portfolio" },
      { source: "/portfolio/:slug", destination: "/en/portfolio/:slug" },
      { source: "/:slug", destination: "/en/:slug" },
    ];
  },
};

export default nextConfig;
