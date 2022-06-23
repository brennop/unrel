module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
  // temporary solution for backdrop-blur not working on production
  // https://github.com/tailwindlabs/tailwindcss/discussions/7044#discussioncomment-2934845
  extractCSS: true,
  optimizeCSS: false,
}
