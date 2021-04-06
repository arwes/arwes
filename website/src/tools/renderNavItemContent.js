import React from 'react';

const renderNavItemContent = text => {
  const content = String(text);

  if (/^`.+`$/.test(content)) {
    return <code>{content.replace(/`/g, '')}</code>;
  }

  return text;
};

export { renderNavItemContent };
