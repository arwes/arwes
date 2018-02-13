import ThemeProvider from '../src/ThemeProvider/Play.md';
import SoundsProvider from '../src/SoundsProvider/Play.md';
import Arwes from '../src/Arwes/Play.md';
import Words from '../src/Words/Play.md';
import Heading from '../src/Heading/Play.md';
import Paragraph from '../src/Paragraph/Play.md';
import Link from '../src/Link/Play.md';
import Blockquote from '../src/Blockquote/Play.md';
import List from '../src/List/Play.md';
import Content from '../src/Content/Play.md';
import Frame from '../src/Frame/Play.md';
import Button from '../src/Button/Play.md';
import Line from '../src/Line/Play.md';
import Loading from '../src/Loading/Play.md';
import Image from '../src/Image/Play.md';
import Code from '../src/Code/Play.md';
import Table from '../src/Table/Play.md';
import Project from '../src/Project/Play.md';
import Header from '../src/Header/Play.md';
import Footer from '../src/Footer/Play.md';
import Grid from '../src/Grid/Play.md';
import Animation from '../src/Animation/Play.md';
import Appear from '../src/Appear/Play.md';
import Highlight from '../src/Highlight/Play.md';
import Puffs from '../src/Puffs/Play.md';
import Logo from '../src/Logo/Play.md';

let sandboxes = [
  { name: 'ThemeProvider', code: ThemeProvider },
  { name: 'SoundsProvider', code: SoundsProvider },
  { name: 'Arwes', code: Arwes },
  { name: 'Words', code: Words },
  { name: 'Heading', code: Heading },
  { name: 'Paragraph', code: Paragraph },
  { name: 'Link', code: Link },
  { name: 'Blockquote', code: Blockquote },
  { name: 'List', code: List },
  { name: 'Content', code: Content },
  { name: 'Frame', code: Frame },
  { name: 'Button', code: Button },
  { name: 'Line', code: Line },
  { name: 'Loading', code: Loading },
  { name: 'Image', code: Image },
  { name: 'Code', code: Code },
  { name: 'Table', code: Table },
  { name: 'Project', code: Project },
  { name: 'Header', code: Header },
  { name: 'Footer', code: Footer },
  { name: 'Grid', code: Grid },
  { name: 'Animation', code: Animation },
  { name: 'Appear', code: Appear },
  { name: 'Highlight', code: Highlight },
  { name: 'Puffs', code: Puffs },
  { name: 'Logo', code: Logo },
];

sandboxes = sandboxes.map(item => {
  return {
    ...item,
    code: item.code.replace(/^\s*\`\`\`.*[\r\n]/gm, '')
  };
});

export default sandboxes;
