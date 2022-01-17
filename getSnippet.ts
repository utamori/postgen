import entities from "https://cdn.skypack.dev/entities";

// https://github.com/rbren/rss-parser/blob/master/lib/utils.js
const getSnippet = (str: string): string => {
  return entities.decodeHTML(stripHtml(str)).trim();
};

const stripHtml = (str: string): string => {
  str = str.replace(
    /([^\n])<\/?(h|br|p|ul|ol|li|blockquote|section|table|tr|div)(?:.|\n)*?>([^\n])/gm,
    "$1\n$3",
  );
  str = str.replace(/<(?:.|\n)*?>/gm, "");
  return str;
};

export { getSnippet };
