/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:
    process.env.SITE_URL || "https://devtamjid.con",
  generateRobotsTxt: true // (optional)
  // ...other options
};
