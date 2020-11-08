// Updates the README.md file content with the list of the showcase projects
// defined in docs/index.json inside the defined file tokens.

const path = require('path');
const fs = require('fs');
const showcaseItems = require('./docs/showcase/showcase.json');

const SHOWCASE_ITEMS_PER_LINE = 3;
const SHOWCASE_ITEM_WIDTH = 252; // In desktop, the GitHub readme page width divided by 3.
const README_FILE_PATH = './README.md';
const README_FILE_ENCODING = 'utf-8';

const showcaseRowsHTML = showcaseItems
  .map(item => ({
    ...item,
    repositoryName: item.repository.replace(/^https?:\/\/[^/]+\//, ''),
    imageRelativePath: './' + path.join('docs/showcase', item.image)
  }))
  .map(({ name, url, repository, repositoryName, imageRelativePath }) =>
    [
      '<td align="center">',
      `<a href="${url}"><img src="${imageRelativePath}" width="${SHOWCASE_ITEM_WIDTH}px;" alt="${name}" /></a>`,
      '<br />',
      `<a href="${url}">${name}</a>`,
      '<br />',
      `<a href="${repository}"><sub>${repositoryName}</sub></a>`,
      '</td>'
    ].join('')
  )
  .reduce((rows, item) => {
    if (!rows.length) {
      return [[item]];
    }

    const lastRow = rows[rows.length - 1];

    if (lastRow.length < SHOWCASE_ITEMS_PER_LINE) {
      lastRow.push(item);
      return rows;
    }

    return [...rows, [item]];
  }, [])
  .map(row => row.join('\n'))
  .join('</tr>\n<tr>');

const showcaseTableHTML = `<table>\n<tr>\n${showcaseRowsHTML}\n</tr>\n</table>`;

const readmeOriginalContent = fs.readFileSync(README_FILE_PATH, {
  encoding: README_FILE_ENCODING
});

const readmeNewContent = readmeOriginalContent.replace(
  /<!-- ARWES-PROJECT-SHOWCASE:START -->[\s\S]*<!-- ARWES-PROJECT-SHOWCASE:END -->/,
  `<!-- ARWES-PROJECT-SHOWCASE:START -->\n${showcaseTableHTML}\n<!-- ARWES-PROJECT-SHOWCASE:END -->`
);

fs.writeFileSync(README_FILE_PATH, readmeNewContent, {
  encoding: README_FILE_ENCODING
});
