export default (theme) => {
  return {
    root: {
      display: props => props.type === 'code' ? 'inline-block' : 'block',
      margin: props => '0 0 ' + (props.type === 'code' ? 0 : theme.margin) + 'px',
      verticalAlign: 'top',
      transition: `all ${theme.animTime}ms ease-out`,
      opacity: 1,

      '&$exiting, &$exited': {
        opacity: 0,
      },

      [`& code[class*="language-"],
        & pre[class*="language-"]`]: {
        fontFamily: theme.code.fontFamily,
        fontSize: theme.code.fontSize,
        lineHeight: '1.375',
        direction: 'ltr',
        textAlign: 'left',
        whiteSpace: 'pre',
        wordSpacing: 'normal',
        wordBreak: 'normal',
        mozTabSize: '2',
        oTabSize: '2',
        tabSize: '2',
        webkitHyphens: 'none',
        mozHyphens: 'none',
        msHyphens: 'none',
        hyphens: 'none',
        background: theme.code.background,
        color: theme.code.color,
      },
      '& pre[class*="language-"]': {
        padding: theme.padding / 2,
        margin: '0',
        overflow: 'auto'
      },
      '& :not(pre) > code[class*="language-"]': {
        padding: 2,
      },
      [`& .token.comment,
        & .token.prolog,
        & .token.doctype,
        & .token.cdata,
        & .token.punctuation`]: {
        color: theme.code.comment,
      },
      '& .token.punctuation': {
        opacity: 1,
      },
      [`& .token.tag,
        & .token.operator`]: {
        color: theme.code.operator,
      },
      [`& .token.property,
        & .token.function`]: {
        color: theme.code.function,
      },
      [`& .token.tag-id,
        & .token.selector,
        & .token.atrule-id`]: {
        color: theme.code.selector,
      },
      [`& code.language-css,
        & pre.language-css,
        & code.language-scss,
        & pre.language-scss,
        & .token.boolean,
        & .token.string,
        & .token.number,
        & .token.entity,
        & .token.url,
        & .language-css .token.string,
        & .language-scss .token.string,
        & .style .token.string,
        & .token.attr-value,
        & .token.keyword,
        & .token.control,
        & .token.directive,
        & .token.unit,
        & .token.statement,
        & .token.regex,
        & .token.atrule`]: {
        color: theme.code.value,
      },
      [`& .token.atrule,
        & .token.attr-value,
        & .token.keyword`]: {
        color: theme.code.keyword,
      },
      [`& .token.placeholder,
        & .token.variable`]: {
        color: theme.code.variable,
      },
      '& .token.deleted': {
        textDecoration: 'line-through'
      },
      '& .token.italic': {
        fontStyle: 'italic'
      },
      [`& .token.important,
        & .token.bold`]: {
        fontWeight: 'bold'
      },
      [`& .token.regex,
        & .token.important`]: {
        color: theme.code.operator,
      },
      '& .token.entity': {
        cursor: 'help'
      },
    },

    entering: {},
    entered: {},
    exiting: {},
    exited: {},
  };
};
