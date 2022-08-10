require('dotenv').config();
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;
const morgan = require('morgan');
const dbConnect = require('./database/mongoConnection');
dbConnect();
const { engine } = require('express-handlebars');
const path = require('path');
const User = require('./models/User');

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', async (req, res) => {
    try {
    const users = await User.find().lean();
    //console.log(resp);
    res.status(200).render('users', {users: users});
    }
    catch(err) {}
});

app.use('*', (req, res) => {
    res.status(404).render('404', {layout: 'error-messages', title: '404 - Not Found'});
});

app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).render('500', {layout: 'error-messages', title: '500 - Internal Server Error'});
});

if(process.env.NODE_ENV !== 'production') {
    app.listen(port, '0.0.0.0', () => {
    console.log(`Server in ascolto sulla porta ${port};
Ctrl-C per uscire`);
    })
} else {
    app.listen(port, () => {
        console.log(`Server in ascolto sulla porta ${port};
    Ctrl-C per uscire`);
        })    
}