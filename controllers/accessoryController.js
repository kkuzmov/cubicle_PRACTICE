// CHANGE FILE/FOLDER NAMES

const { Router } = require('express');
const accessoryService = require('../services/accessoryService'); // ВНИМАВАЙ С ИМЕНАТА!
const router = Router();

// ВНИМАВАЙ С ИМЕНАТА!

router.get('/create', (req, res)=>{
    res.render('createAccessory', {title: 'Create accessory'});
})
router.post('/create', (req, res) => {
    accessoryService.create(req.body)
        .then(newAcc =>{
            res.redirect('/')
        })
})

module.exports = router