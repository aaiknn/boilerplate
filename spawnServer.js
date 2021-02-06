const express = require('express');
const app = express();
const port = 3000;
const buildPath = require('./buildConfig').srcPath;

app.use(express.static( __dirname + `/${buildPath}` ));

app.get('/', (request, response) => {
    response.send(result);
});

app.listen(process.env.PORT || port, (error) => {
  if (error) {
    return console.error('Oh no', error)
  }

  console.log(`server is listening on ${port}`)
})