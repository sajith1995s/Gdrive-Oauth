const router = require('express').Router();
const pasport = require('passport')

//auth Login
router.get('/login', (req, res) => {
    res.render('login')
});

//auth google
router.get('/google', pasport.authenticate('google', {
    scope:['profile', 'email', 'https://www.googleapis.com/auth/drive.file']
}));

//auth logout
router.get('/logout', (req, res) => {
     

    res.send('login out')
});

//redirect endpoint
router.get('/google/redirect', pasport.authenticate('google'), (req, res) => {
 
    // res.send(req.session)
    res.redirect('/profile/')
});

module.exports = router;