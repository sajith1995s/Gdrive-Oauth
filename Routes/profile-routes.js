const router = require('express').Router();

const checkAuthentication = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
}

router.get('/', checkAuthentication, (req, res) => {
    res.render('profile', {loggedUser: req.user})
})

module.exports = router;