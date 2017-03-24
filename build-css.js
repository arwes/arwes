const fs = require('fs');
const sass = require('node-sass');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const postcssList = [
  autoprefixer({
    browsers: [
      'last 10 version',
      '> 5%'
    ]
  }),
  cssnano({
    safe: true
  })
];

const content = sass.renderSync({
  file: './src/_distribution.scss',
  outputStyle: 'compressed',
});

postcss(postcssList).process(content.css).then(result => {
  fs.writeFile('./dist/index.css', result.css);
});
