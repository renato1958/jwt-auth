const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
    const { username, first, last, role, email, password } = req.body;

    try {
        if(
            !username ||
            !first ||
            !last ||
            !email ||
            !password
        ) {
            return res.status(400).send("Campi mancanti: tutti i campi sono obbligatori");
        }

        const existingUser = await User.findOne({ username });
        if(existingUser) {
            return res.status(409).send("Utente già inserito. Login per entrare.")
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            first,
            last,
            role,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        const token = jwt.sign(
            { username, email },
            process.env.AUTH_KEY,
            { expiresIn: "2h"}
        );

        newUser.token = token;

        return res.status(201).json(newUser);

    } catch(err) {
        return res.status(500).json("Impossibile inviare la richiesta");
    };
});

router.post('/login', async (req, res) => {

    try {
        const { username, password } = req.body;
        if(
            !username ||
            !password
        ) {
            return res.status(400).send("Entrambi i campi sono obbligatori");
        }

        const user = await User.findOne({ username });

        if(user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { username, password },
                process.env.AUTH_KEY,
                { expiresIn: "2h"}
            );

            user.token = token;

            return res.status(200).json(user);
        }

        return res.status(400).send("Credenziali non corrette");

    } catch(err) {
        return res.status(500).send("Errore sconosciuto. Riprovare più tardi.")
    }
});

module.exports = router;