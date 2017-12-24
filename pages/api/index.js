import withContent from '../../site/withContent';
import { components } from '../../site/settings';
import markdown from '../../site/api/index.md';

const list = components.
  map(name => {
    const nameLower = name.toLowerCase();
    return `- [${name}](/api/${nameLower})`;
  }).
  join('\n');

export default withContent({ markdown: markdown + '\n' + list });
