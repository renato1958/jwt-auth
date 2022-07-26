require('dotenv').config();
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;
const morgan = require('morgan');
const dbConnect = require('./database/mongoConnection');
dbConnect();
const path = require('path');
const authRoutes = require('./routes/api/auth');

const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes);

app.listen(port, '0.0.0.0', () => {
    console.log(`Server in ascolto sulla porta ${port};
Ctrl-C per uscire`);
});