/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    API_URL:process.env.API_URL,
    JWT_SECRET:process.env.JWT_SECRET
  },
  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL,
    API_URL:process.env.API_URL,
    JWT_SECRET:process.env.JWT_SECRET
  }
}
