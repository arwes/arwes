// Updates the README.md file content with the list of the showcase projects
// defined in docs/index.json file inside the file project showcase tokens.

const path = require('path');
const fs = require('fs');
const docsPagesIndexData = require('./docs/index.json');

const showcaseItemsPerRow = 3;
const showcaseItemWidth = 252; // In desktop, the GitHub readme page width divided by 3.
const showcasePageID = 'SHOWCASE';
const showcasePage = docsPagesIndexData.find(page => page.id === showcasePageID);

const showcaseRowsHTML = showcasePage.items
  .map(item => ({
    ...item,
    repositoryName: item.repository.replace(/^https?:\/\/[^/]+\//, ''),
    imageRelativePath: './' + path.join('docs', item.image)
  }))
  .map(({ name, url, repository, repositoryName, imageRelativePath }) =>
    [
      '<td align="center">',
      `<a href="${url}"><img src="${imageRelativePath}" width="${showcaseItemWidth}px;" alt="${name}" /></a>`,
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

    if (lastRow.length < showcaseItemsPerRow) {
      lastRow.push(item);
      return rows;
    }

    return [...rows, [item]];
  }, [])
  .map(row => row.join(''))
  .join('');

const showcaseTableHTML = `<table>${showcaseRowsHTML}</table>`;

const readmeFilePath = './README.md';
const readmeFileEncoding = 'utf-8';
const readmeOriginalContent = fs.readFileSync(readmeFilePath, {
  encoding: readmeFileEncoding
});
const readmeNewContent = readmeOriginalContent.replace(
  /<!-- ARWES-PROJECT-SHOWCASE:START -->[\s\S]*<!-- ARWES-PROJECT-SHOWCASE:END -->/,
  `<!-- ARWES-PROJECT-SHOWCASE:START -->\n${showcaseTableHTML}\n<!-- ARWES-PROJECT-SHOWCASE:END -->`
);

fs.writeFileSync(readmeFilePath, readmeNewContent, {
  encoding: readmeFileEncoding
});
