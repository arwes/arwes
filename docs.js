const express = require('express');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 17000;

app.use(morgan('common'));
app.use(express.static(`${process.cwd()}/docs`));
app.use(express.static(`${process.cwd()}/dist`));

app.listen(port, function (err) {
  if (err) throw err;
  console.log(`Server running at http://127.0.0.1:${port}`);
});
