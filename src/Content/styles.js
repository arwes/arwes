import { getHeadingStyles } from '../Heading/styles';
import { getParagraphStyles } from '../Paragraph/styles';
import { getLinkStyles } from '../Link/styles';
import { getBlockquoteStyles } from '../Blockquote/styles';
import { getListStyles, getULStyles, getOLStyles, getDLStyles } from '../List/styles';

export default (theme) => ({
  root: {
    '& h1, & h2, & h3, & h4, & h5, & h6': getHeadingStyles(theme),
    '& h1': { fontSize: theme.typography.headerSizes.h1 },
    '& h2': { fontSize: theme.typography.headerSizes.h2 },
    '& h3': { fontSize: theme.typography.headerSizes.h3 },
    '& h4': { fontSize: theme.typography.headerSizes.h4 },
    '& h5': { fontSize: theme.typography.headerSizes.h5 },
    '& h6': { fontSize: theme.typography.headerSizes.h6 },

    '& a': getLinkStyles(theme),

    '& p': getParagraphStyles(theme),

    '& blockquote': getBlockquoteStyles(theme),

    '& ul, & ol, & dl': getListStyles(theme),
    '& ul': getULStyles(theme),
    '& ol': getOLStyles(theme),
    '& dl': getDLStyles(theme),
  },
});
