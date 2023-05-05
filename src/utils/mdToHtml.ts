import showdown from "showdown";

const converter = new showdown.Converter({
  tables: true,
  tasklists: true,
  strikethrough: true,
  simplifiedAutoLink: true,
  openLinksInNewWindow: true,
});

const linkConverter = new showdown.Converter({
  noHeaderId: true,               // Disable automatic generation of heading IDs.
  parseImgDimensions: false,      // Disable image dimensions
  strikethrough: false,           // Disable support for strikethrough
  tables: false,                  // Disable support for tables.
  tasklists: false,               // Disable support for GitHub style tasklists.
  simpleLineBreaks: true,         // Enable line breaks as <br/> in paragraphs
  openLinksInNewWindow: true,     // Open links in new windows.
  backslashEscapesHTMLTags: true, // Support escaping of HTML tags.
  simplifiedAutoLink: true,       // Enable automatic linking for plain text URLs.
});

const mdToHtml = (value: string): string => {
  return converter.makeHtml(value);
};

const linkRenderer = (value: string): string => {
  return linkConverter.makeHtml(value);
};

export { mdToHtml, linkRenderer };
