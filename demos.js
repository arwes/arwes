const express = require('express');

const app = express();
const port = process.env.PORT || 7000;

app.use(express.static(`${process.cwd()}/demos`));

app.listen(port, function (err) {
  if (err) throw err;
  console.log(`Server running at http://127.0.0.1:${port}`);
});
