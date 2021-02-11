// CHANGE FILE/FOLDER NAMES

const {
    Router, response
} = require('express');
const router = Router();
const productService = require('../services/productService');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');
const {
    validateProduct
} = require('../controllers/helpers/productHelper');
const accessoryService = require('../services/accessoryService');

router.get('/', (req, res) => {
    let products = productService.getAll(req.query)

        .then(products => {
            res.render('home', {
                title: 'Home',
                products
            })
            console.log(req.user)

        })
        .catch((err) => res.status(500).end())
})
router.get('/create', isAuthenticated, (req, res) => {
    res.render('create', {
        title: 'Create new cube'
    });
})
router.post('/create', isAuthenticated, validateProduct, (req, res) => {
    let newCubeData = req.body;
    productService.createCube(newCubeData, req.user._id)
        .then(response => {
            res.redirect('/products')
        })
        .catch((err) => {
            res.status(500).end()
        })
})
router.get('/details/:productId',isAuthenticated, (req, res) => {
    productService.getOneWithAccessories(req.params.productId)
        .then(product => {
            res.render('details', {title: 'Product details', product})
        })
        .catch(err => res.redirect('/no-such-product')) // - renders 404 PAGE
})
router.get('/:productId/attach',isAuthenticated, async (req, res) => {
    let product = await productService.getOne(req.params.productId);

    let accessories = await accessoryService.getAllWithout(product.accessories);
    res.render('attachAccessory', {
        title: 'Attach accessories',
        product,
        accessories
    })
})
router.post('/:productId/attach',isAuthenticated, async (req, res) => {
    await productService.attachAccessory(req.params.productId, req.body.accessory)
    res.redirect(`/products/details/${req.params.productId}`);
})
router.get('/:productId/edit',isAuthenticated, (req, res)=>{
    productService.getOne(req.params.productId)
        .then(product =>{
            res.render('editCubePage', product)
        })
})
router.post('/:productId/edit',isAuthenticated, validateProduct, (req, res)=>{
    productService.updateOne(req.params.productId, req.body)
        .then(response =>{
            res.redirect(`/products/details/${req.params.productId}`);
        })
        .catch((err)=>{
            res.redirect('page-not-found')
        })
})
router.get('/:productId/delete',isAuthenticated, (req, res)=>{
    let product = productService.getOne(req.params.productId)
        .then(response =>{
            res.render('deleteCubePage', response);
        })
        .catch(err=> res.redirect('page-not-found'))
})
router.post('/:productId/delete',isAuthenticated, (req, res)=>{
    productService.getOne(req.params.productId)
        .then(product => {
            if(product.creator != req.user._id){
                return res.redirect('/products');
            }
           return productService.deleteOne(req.params.productId)
        })
        .then(response =>{res.redirect('/products')})
        .catch((err)=>{res.redirect('page-not-found')})
})
// CONTROLLER ИЗПОЛЗВА ФУНКЦИИТЕ, СЪЗДАДЕНИ В PRODUCTSERVICE ЗА СЪЗДАВАНЕ ИЛИ ИЗВИКВАНЕ НА ВСИЧКИ ПРОДУКТИ
// ЧАСТ ОТ EXAM PACKAGE


module.exports = router;