require('dotenv').config();
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;
const morgan = require('morgan');
const dbConnect = require('./database/mongoConnection');
dbConnect();
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => res.render('users', {title: 'Cujun!'}));

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