import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

function Head ({ lang, title, description, meta, link }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const siteMetadata = site.siteMetadata || {};
  const defaultTitle = siteMetadata.title;
  const metaDescription = description || siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={title || defaultTitle}
      titleTemplate={title ? `%s | ${defaultTitle}` : null}
      meta={[
        { name: 'description', content: metaDescription },
        { property: 'og:title', content: title },
        { property: 'og:site_name', content: siteMetadata.siteName },
        { property: 'og:description', content: metaDescription },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:creator', content: siteMetadata.author },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: metaDescription },
        { name: 'og:url', content: siteMetadata.url },
        { name: 'og:image', content: siteMetadata.image }
      ].concat(meta)}
      link={[
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300;400;600&family=Titillium+Web:wght@300;400;600&display=swap' }
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
