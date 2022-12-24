const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('./config/jwt')

//routes import
const login = require('./routes/login');
const register = require('./routes/register');
const user = require('./routes/user');

const app = express();
const port = 3000;

app.use(express.json());
app.set("key", config.key);

//routes
app.get('/', (req, res) => {
    res.send('Here eventually will show something...');
});


app.use('/', login);
app.use('/', register);
app.use('/', user);


app.listen(port, () => {
    console.log(`listening on port ${port}...`)
});
