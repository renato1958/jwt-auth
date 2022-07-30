require('dotenv').config();
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;
const morgan = require('morgan');
const dbConnect = require('./database/mongoConnection');
dbConnect();
const path = require('path');
const authRoutes = require('./routes/api/auth');
const usersRoutes = require('./routes/api/users');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use(express.static('public'));

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