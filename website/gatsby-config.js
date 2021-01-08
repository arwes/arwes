const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Arwes',
    siteName: 'Arwes',
    description: 'Futuristic Sci-Fi UI Web Framework.',
    author: '@arwesjs',
    url: 'https://arwes.dev',
    image: 'https://arwes.dev/arwes.jpg'
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-50433259-2',
        head: true
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
        background_color: '#000909',
        theme_color: '#000909',
        display: 'minimal-ui',
        icon: 'src/images/icon.png'
      }
    },
    'gatsby-plugin-mdx'
  ]
};
