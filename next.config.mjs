/** @type {import('next').NextConfig} */

const nextConfig = {

  webpack(config) {
    // Add a rule to handle SVGs as React components
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  reactStrictMode: true,

  // Don't advertise the framework version.
  poweredByHeader: false,

  compress: true,

  // Keep one canonical URL shape so crawlers don't see /path and /path/
  // as two different pages.
  trailingSlash: false,

  async headers() {
    return [
        {
            // matching all API routes
            source: "/api/:path*",
            headers: [
                { key: "Access-Control-Allow-Credentials", value: "true" },
                { key: "Access-Control-Allow-Origin", value: "https://www.amorsinmiedo.com" },
                { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, authorization" },
            ]
        },
        {
            source: "/:path*",
            headers: [
                { key: "X-Content-Type-Options", value: "nosniff" },
                { key: "X-Frame-Options", value: "SAMEORIGIN" },
                { key: "Referrer-Policy", value: "origin-when-cross-origin" },
                {
                    key: "Strict-Transport-Security",
                    value: "max-age=63072000; includeSubDomains; preload"
                },
            ]
        }
    ]
}
};

export default nextConfig;
