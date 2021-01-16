import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import settings from '../../settings';

function Head ({ lang, title, description, meta, link }) {
  const { metadata } = settings;
  const defaultTitle = metadata.title;
  const metaDescription = description || metadata.description;
  const metaTitle = title
    ? `${title} | ${defaultTitle}`
    : defaultTitle;

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={metaTitle}
      meta={[
        { name: 'description', content: metaDescription },
        { property: 'og:title', content: metaTitle },
        { property: 'og:site_name', content: metadata.siteName },
        { property: 'og:description', content: metaDescription },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:creator', content: metadata.author },
        { name: 'twitter:title', content: metaTitle },
        { name: 'twitter:description', content: metaDescription },
        { name: 'og:url', content: metadata.url },
        { name: 'og:image', content: metadata.image }
      ].concat(meta)}
      link={[
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;600&family=Source+Code+Pro:wght@300;400;600&display=swap' }
      ].concat(link)}
    />
  );
}

Head.defaultProps = {
  lang: 'en',
  title: '',
  description: '',
  meta: [],
  link: []
};

Head.propTypes = {
  lang: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  link: PropTypes.arrayOf(PropTypes.object)
};

export { Head };
