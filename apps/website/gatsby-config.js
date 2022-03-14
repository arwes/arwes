const path = require('path');

const settings = require('./settings');

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: settings.gaTrackingId
      }
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: path.join(__dirname, '/src/pages')
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, '/src/images')
      }
    },
    'gatsby-plugin-emotion',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Arwes',
        short_name: 'Arwes',
        start_url: '/',
        background_color: '#001313',
        theme_color: '#001313',
        display: 'minimal-ui',
        icon: 'static/logo.png'
      }
    },
    'gatsby-plugin-mdx',
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@repository': path.join(process.cwd(), '..')
        }
      }
    }
  ]
};
