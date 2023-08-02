const express = require('express');
const path = require('path');

const PORT = 5000;

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
