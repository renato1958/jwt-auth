const router = require('express').Router();
const User = require('../../models/User');

router.get('/', async (req, res) => {
    try {
        const resp = await User.find();
        if(!resp) res.status(204);
        res.render('users', {title: "Utenti", users: resp});
    }
    catch(err) {console.log(err.message)}
})

module.exports = router;