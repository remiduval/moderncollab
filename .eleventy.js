const htmlmin = require("html-minifier");
const svgContents = require("eleventy-plugin-svg-contents");

module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);

  //eleventyConfig.addWatchTarget("./_tmp/style.css");

  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("admin");
  //eleventyConfig.addPassthroughCopy({ "./_tmp/style.css":                         "assets/css/style.css" });
  eleventyConfig.addPassthroughCopy({ "./node_modules/alpinejs/dist/alpine.js":   "assets/js/alpine.js"});
  eleventyConfig.addPassthroughCopy({ "content/uploads":                          "assets/uploads" });
  eleventyConfig.addPassthroughCopy({ "_includes/assets/":                        "assets" });

  eleventyConfig.addPlugin(svgContents);

  eleventyConfig.addShortcode("version", function () {
    return String(Date.now());
  });

  /* Markdown Plugins */
  // let markdownIt = require("markdown-it");
  // let options = {
  //   html: true,
  //   breaks: true,
  //   linkify: true
  // };
  // eleventyConfig.setLibrary("md", markdownIt(options));


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



  // var markdownItAttrs = require('markdown-it-attrs');
  // let options = {
  //   html: true,
  //   breaks: true,
  //   linkify: true
  // };
  // let markdownLib = markdownIt(options).use(markdownItAttrs);
  // eleventyConfig.setLibrary("md", markdownLib);



  return {
    dir: {
      data: "content/globals",
      includes: "_includes"
    }

  };


  // return {
  //   dir: {
  //     data: "content/globals",
  //   },
  //   templateFormats: ["md", "njk"],
  //   markdownTemplateEngine: "njk",
  //   htmlTemplateEngine: "njk",
  //   passthroughFileCopy: true
  // };


};
