import { RenderPlugin } from "@11ty/eleventy";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

export default function (eleventyConfig) {
  // Render Markdown partials inline (renderFile) + build-time code highlighting.
  eleventyConfig.addPlugin(RenderPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);

  // Copy static assets (img/, toys/, styles/, robots.txt, …) to the site root.
  eleventyConfig.addPassthroughCopy({ "src/files": "/" });

  // Publications are rendered inline on the homepage and never written as
  // standalone pages (see src/pubs/pubs.11tydata.js). Newest first.
  eleventyConfig.addCollection("pubs", (api) =>
    api
      .getFilteredByGlob("src/pubs/*.md")
      .sort((a, b) => (a.data.pubdate < b.data.pubdate ? 1 : -1))
  );

  // M/D/YYYY in UTC — matches the old DocPad formatDate helper.
  eleventyConfig.addFilter("formatDate", (value) => {
    const d = new Date(value);
    return `${d.getUTCMonth() + 1}/${d.getUTCDate()}/${d.getUTCFullYear()}`;
  });

  // ISO-8601 timestamp for the Atom feed.
  eleventyConfig.addFilter("isoDate", (value) => new Date(value).toISOString());

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md"],
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
  };
}
