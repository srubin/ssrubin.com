export default {
  tags: "posts",
  layout: "layouts/post.njk",
  permalink: (data) => `/posts/${data.page.fileSlug}.html`,
};
