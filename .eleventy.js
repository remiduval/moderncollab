const htmlmin = require("html-minifier");
const svgContents = require("eleventy-plugin-svg-contents");

module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addWatchTarget("./_tmp/style.css");

  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy({ "./_tmp/style.css":                         "assets/css/style.css" });
  eleventyConfig.addPassthroughCopy({ "./node_modules/alpinejs/dist/alpine.js":   "assets/js/alpine.js"});
  eleventyConfig.addPassthroughCopy({ "content/uploads":                          "assets/uploads" });
  eleventyConfig.addPassthroughCopy({ "_includes/assets/":                        "assets" });

  eleventyConfig.addPlugin(svgContents);

  eleventyConfig.addShortcode("version", function () {
    return String(Date.now());
  });

  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (
      process.env.ELEVENTY_PRODUCTION &&
      outputPath &&
      outputPath.endsWith(".html")
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });

  return {
    dir: {
      data: "content/globals",
    }
  };
};
