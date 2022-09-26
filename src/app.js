const express = require('express');
const errorMiddleware = require('./middleware/error');
const routesLogin = require('./routes/login.router');
const routesUser = require('./routes/user.router');
// ..

const app = express();

app.use(express.json());

// ...

app.use('/login', routesLogin);
app.use('/user', routesUser);

app.use(errorMiddleware);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
