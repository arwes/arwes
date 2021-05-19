module.exports = {
  metadata: {
    title: 'Arwes',
    siteName: 'Arwes',
    description: 'Futuristic Sci-Fi UI Web Framework.',
    author: '@arwesjs',
    url: 'https://arwes.dev',
    image: 'https://arwes.dev/arwes.jpg'
  },

  gaTrackingId: 'UA-50433259-2',

  hierarchy: [
    {
      name: 'Project',
      path: 'project',
      items: [
        { name: 'Purpose', path: 'purpose' },
        {
          name: 'Guidelines',
          path: 'guidelines',
          items: [
            { name: 'Systems', path: 'systems' },
            { name: 'States', path: 'states' },
            { name: 'Events', path: 'events' }
          ]
        },
        { name: 'FAQ', path: 'faq' },
        { name: 'Roadmap', path: 'roadmap' },
        {
          name: 'Contributing',
          path: 'contributing',
          items: [
            { name: 'Workflow', path: 'workflow' },
            { name: 'Architecture', path: 'architecture' },
            { name: 'Playground', path: 'playground' },
            { name: 'Website', path: 'website' }
          ]
        },
        { name: 'Changelog', path: 'changelog' }
      ]
    },
    {
      name: 'Design',
      path: 'design',
      items: []
    },
    {
      name: 'Develop',
      path: 'develop',
      items: [
        {
          name: '`@arwes/design`',
          path: 'design',
          items: [
            { name: 'Breakpoints', path: 'breakpoints' },
            { name: 'Palette', path: 'palette' },
            { name: 'Multipliers', path: 'multipliers' }
          ]
        },
        {
          name: '`@arwes/animator`',
          path: 'animator',
          items: [
            { name: 'Nesting Animators', path: 'nesting' },
            { name: 'Animator Managers', path: 'managers' }
          ]
        },
        {
          name: '`@arwes/bleeps`',
          path: 'bleeps',
          items: [
            { name: 'Bleeps Categories', path: 'categories' },
            { name: 'Sound Accessibility', path: 'accessibility' }
          ]
        },
        {
          name: '`@arwes/core`',
          path: 'core',
          items: []
        }
      ]
    },
    {
      name: 'Community',
      path: 'community',
      items: [
        { name: 'Code of Conduct', path: 'code-of-conduct' }
      ]
    }
  ]
};
