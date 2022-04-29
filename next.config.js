/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  publicRuntimeConfig: {
    API_URL:process.env.API_URL,
  }
}
