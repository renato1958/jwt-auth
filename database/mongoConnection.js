const mongoose = require('mongoose');

async function dbConnect() {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log('Collegamento con MongoDB stabilita con successo');
    } catch(err) {
        console.log('Impossibile connettersi a MongoDB');
    }
}

module.exports = dbConnect;