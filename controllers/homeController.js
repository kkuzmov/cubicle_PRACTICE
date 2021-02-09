const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.redirect('/products');
})
router.get('/about', (req, res) => {
    res.render('about', {title: 'About us'});
})

module.exports = router


// HOME CONTROLLER - ЗАРЕЖДА HOME И ABOUT PAGES
// ЧАСТ ОТ EXAM PACKAGE