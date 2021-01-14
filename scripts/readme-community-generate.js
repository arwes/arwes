// Updates the README.md file content with the list of the community projects
// defined in "docs/community".

const path = require('path');
const { readFileSync, writeFileSync } = require('fs');
const appsItems = require('../website/static/community/apps/apps.json');

const README_FILE_PATH = path.join(process.cwd(), 'README.md');
const README_FILE_ENCODING = 'utf-8';
const APPS_ITEMS_PER_LINE = 3;
const APPS_ITEM_WIDTH = 252; // In desktop, the GitHub readme page width divided by 3.

const appsRowsHTML = appsItems
  .map(item => ({
    ...item,
    repositoryName: item.repository.replace(/^https?:\/\/[^/]+\//, ''),
    imageRelativePath: './' + path.join('website/static/community/apps/images', item.image)
  }))
  .map(({ name, url, repository, repositoryName, imageRelativePath }) =>
    [
      '<td align="center">',
      `<a href="${url}"><img src="${imageRelativePath}" width="${APPS_ITEM_WIDTH}px;" alt="${name}" /></a>`,
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

    if (lastRow.length < APPS_ITEMS_PER_LINE) {
      lastRow.push(item);
      return rows;
    }

    return [...rows, [item]];
  }, [])
  .map(row => row.join('\n'))
  .join('</tr>\n<tr>');

const showcaseTableHTML = `<table>\n<tr>\n${appsRowsHTML}\n</tr>\n</table>`;

const readmeOriginalContent = readFileSync(README_FILE_PATH, {
  encoding: README_FILE_ENCODING
});

const readmeNewContent = readmeOriginalContent.replace(
  /<!-- ARWES-COMMUNITY-APPS:START -->[\s\S]*<!-- ARWES-COMMUNITY-APPS:END -->/,
  `<!-- ARWES-COMMUNITY-APPS:START -->\n${showcaseTableHTML}\n<!-- ARWES-COMMUNITY-APPS:END -->`
);

writeFileSync(README_FILE_PATH, readmeNewContent, {
  encoding: README_FILE_ENCODING
});
