// Generate the components API documentation.
// For each component, its source code and readme files are read and parsed,
// then its docs config is saved in a file and its next.js page is created.

const fs = require('fs');
const path = require('path');
const docgen = require('react-docgen');

const { components } = require('../site/settings');
const componentsPath = './site/api-components';
const docsPath = './pages/api';
const readmeFileName = 'Readme.md';
const encoding = 'utf8';

components.
  filter(name => !!name).
  map(name => {

    const folderPath = 'src/' + name;
    const nameLower = name.toLowerCase();

    const readmePath = path.resolve(process.cwd(), folderPath, readmeFileName);
    const readme = fs.readFileSync(readmePath, { encoding });

    // Get component API if existing.
    let api;
    const componentPath = path.resolve(process.cwd(), folderPath, name + '.js');
    if (fs.existsSync(componentPath)) {
      const componentSrc = fs.readFileSync(componentPath, { encoding });
      api = docgen.parse(componentSrc);
    }

    // Generate the component defintion content to import in the page.
    const componentContent = JSON.stringify({
      name,
      readme,
      path: folderPath,
      api,
    });

    fs.writeFileSync(
      path.resolve(componentsPath, nameLower + '.json'),
      componentContent,
      { encoding }
    );

    // Generate the page component content.
    const pageContent = `import withApi from '../../site/withApi';
import component from '../../site/api-components/${nameLower}.json';

export default withApi({ component });
`;

    fs.writeFileSync(
      path.resolve(docsPath, nameLower + '.js'),
      pageContent,
      { encoding }
    );
  });

console.log(components.length + ' components docs were generated.');
