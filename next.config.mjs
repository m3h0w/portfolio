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
  async headers() {
    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https:",
      "style-src 'self' 'unsafe-inline' https:",
      // Next.js injects inline scripts; keep this conservative but compatible.
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:",
      "connect-src 'self' https:",
      // Allow live preview iframes.
      "frame-src 'self' https:",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Resource-Policy", value: "same-site" },
          { key: "Content-Security-Policy", value: csp },
        ],
      },
    ];
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
      { source: "/cv/:path*", destination: "/en/cv/:path*" },
      { source: "/projects", destination: "/en/projects" },
      { source: "/projects/:slug", destination: "/en/projects/:slug" },
      { source: "/portfolio", destination: "/en/portfolio" },
      { source: "/portfolio/:slug", destination: "/en/portfolio/:slug" },
      { source: "/:slug", destination: "/en/:slug" },
    ];
  },
  async redirects() {
    return [
      {
        source: "/en",
        has: [{ type: "header", key: "accept", value: "text/html" }],
        destination: "/",
        permanent: true,
      },
      {
        source: "/en/:path*",
        has: [{ type: "header", key: "accept", value: "text/html" }],
        destination: "/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
