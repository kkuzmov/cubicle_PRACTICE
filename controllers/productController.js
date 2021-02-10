// CHANGE FILE/FOLDER NAMES

const { Router } = require('express');
const router = Router();
const productService = require('../services/productService');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');
const { validateProduct } = require('../controllers/helpers/productHelper');
const accessoryService = require('../services/accessoryService');

router.get('/', (req, res) => {
    let products = productService.getAll(req.query)
            .then(products =>{
                res.render('home', {title: 'Home', products})
            })
            .catch((err) => res.status(500).end())
})
router.get('/create', (req, res) => {
    res.render('create', {title: 'Create new cube'});
})

router.post('/create', validateProduct, (req, res) => {
    let newCubeData = req.body;
    productService.createCube(newCubeData)
        .then(response=>{
            res.redirect('/products')
        })
        .catch((err)=>{res.status(500).end()})
})
router.get('/details/:productId', (req, res)=>{
    productService.getOneWithAccessories(req.params.productId)
        .then(product =>{
            res.render('details', {title: 'Product details', product})
        })
        .catch(err => res.redirect('/no-such-product')) // - render 404 PAGE
})
router.get('/:productId/attach', async(req, res)=>{
    let product = await productService.getOne(req.params.productId);

    let accessories = await accessoryService.getAllWithout(product.accessories);
    res.render('attachAccessory', {title: 'Attach accessories', product, accessories})
})
router.post('/:productId/attach', async (req, res)=>{
  await productService.attachAccessory(req.params.productId, req.body.accessory)
    res.redirect(`/products/details/${req.params.productId}`);
})

// CONTROLLER ИЗПОЛЗВА ФУНКЦИИТЕ, СЪЗДАДЕНИ В PRODUCTSERVICE ЗА СЪЗДАВАНЕ ИЛИ ИЗВИКВАНЕ НА ВСИЧКИ ПРОДУКТИ
// ЧАСТ ОТ EXAM PACKAGE


module.exports = router;