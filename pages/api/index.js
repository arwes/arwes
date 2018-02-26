import React from 'react';
import { Row, Col } from '../../src/Grid';
import withContent from '../../site/withContent';
import markdown from '../../site/api/index.md';
import {
  componentsProviders,
  componentsContainers,
  componentsContents,
  componentsStatics,
  componentsControls,
  componentsAnimations
} from '../../site/settings';

const makeList = (header, items) => {
  const list = items.map(name => `- [${name}](/api/${name.toLowerCase()})`).join('\n');
  return `\n## ${header}\n${list}\n`;
};

const groups = [
  makeList('Providers', componentsProviders),
  makeList('Containers', componentsContainers),
  makeList('Contents', componentsContents),
  makeList('Statics', componentsStatics),
  makeList('Controls', componentsControls),
  makeList('Animations', componentsAnimations)
];

const App = ({ compile }) => (
  <div>
    {compile(markdown).tree}
    <Row nested>
      {groups.map((group, index) => (
        <Col key={index} s={12} m={6} l={4}>
          {compile(group).tree}
        </Col>
      ))}
    </Row>
  </div>
);

export default withContent({ App });
