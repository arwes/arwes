import withContent from '../../site/withContent';
import markdown from '../../site/api/index.md';
import {
  componentsProviders,
  componentsContainers,
  componentsContents,
  componentsControls,
  componentsAnimations
} from '../../site/settings';

const makeList = (header, items) => {
  const list = items.map(name => `- [${name}](/api/${name.toLowerCase()})`).join('\n');
  return `\n## ${header}\n${list}\n`;
};

export default withContent({
  markdown: markdown
    + makeList('Providers', componentsProviders)
    + makeList('Containers', componentsContainers)
    + makeList('Contents', componentsContents)
    + makeList('Controls', componentsControls)
    + makeList('Animations', componentsAnimations)
});
