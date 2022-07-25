/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};
module.exports = {
  env: {
    database: "resultSheet",
    DB_PASS: "",
    USER: "root",
  },
};

module.exports = nextConfig;
