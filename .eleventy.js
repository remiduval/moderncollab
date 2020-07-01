const htmlmin = require("html-minifier");
const svgContents = require("eleventy-plugin-svg-contents");

module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy({ "content/uploads":    "assets/uploads" });
  eleventyConfig.addPassthroughCopy({ "_includes/assets/":  "assets" });

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

  let markdownIt = require("markdown-it");
  let options = {
    breaks: true,
  };
  eleventyConfig.setLibrary("md", markdownIt(options));

  const mdRender = new markdownIt();
  eleventyConfig.addFilter("markdownToHtml", function (rawString) {
    return mdRender.render(rawString);
  });

  return {
    dir: {
      data: "content/globals",
      includes: "_includes"
    }

  };

};
