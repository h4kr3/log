var express = require('express');
var router = express.Router();

const signin = require('../controllers/admin/signin')
const logout = require('../controllers/admin/logout')
const product = require('../controllers/admin/product')
const user = require('../controllers/admin/user')
const order = require('../controllers/admin/order')
const coupon = require('../controllers/admin/coupon')

//AUTHENTICATION VERIFYING
function adminloggedin(req, res, next) {
  if (req.session.adminLoggedIn) {
    res.redirect('/admin/admin-land')
  } else {
    next()
  }

}
//AUTHENTICATION VERIFYING
function adminloggedout(req, res, next) {
  if (req.session.adminLoggedIn) {
    next()
  } else {
    res.redirect('/admin')
  }

}

//ADMIN LOGIN PAGE
router.get('/', adminloggedin, signin.getAdmin);
//ADMIN LOGIN VERIFICATION
router.post('/asignin', adminloggedin, signin.postAdmin)
//ADMIN DASHBOARD
router.get('/admin-land', adminloggedout, signin.adminLand)
//ADMIN LOGOUT
router.get('/alogout', adminloggedout, logout.adminLogout)
//PRODUCT LIST
router.get('/products', adminloggedout, product.getProducts)
//PRODUCT LIST
router.get('/product-list/:id', adminloggedout, product.listProduct)
//DELETE PRODUCT
router.get('/delete-product/:id', adminloggedout, product.deleteProduct)
//ADD PRODUCT
router.get('/add-products', adminloggedout, product.addProduct)
//POST ADD PRODUCT
router.post('/add-products', upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 },]), product.postAdminAddProduct)
//EDIT PRODUCT
router.get('/edit-product/:id', adminloggedout, product.editProduct)
//POST EDIT PRODUCT
router.post('/edit-products/:id', upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 },]), product.postAdminEditProduct)
//CATEGORY
router.get('/add-category', adminloggedout, product.category)
//CATEGORY LIST
router.get('/category', adminloggedout, product.categoryList)
//ADD CATEGORY
router.post('/category', upload.fields([{ name: 'image1', maxCount: 1 }]), product.postAdminAddCat)
//EDIT CATEGORY
router.get('edit-category/:id', adminloggedout, product.getCatEdit)
//POST EDIT CATEGORY
router.post('/edit-category/:id', upload.fields([{ name: 'image1', maxCount: 1 }]), product.postAdminEditCat)
//DELETE CATEGORY
router.get('/delete-category/:id', adminloggedout, product.deleteCat)
//VIEW USER
router.get('/view-user', adminloggedout, user.getAllusers)
//BLOCK USER
router.get('/block-user/:id', adminloggedout, user.blockUser)
//ORDERS
router.get('/orders', adminloggedout, order.orderLIst)
//ORDER DETAILS
router.get('/view-orderAdmin/:id', adminloggedout, order.getOrderProduct)
//ODER RETURN
router.get('/return-order-recieved/:id', order.returnOrder)
//SHIPPED ORDER
router.get('/shipped-order/:id',order.orderShipped)
//DELIVERED ORDER
router.get('/delivered-order/:id',order.orderDelivered)
//SALES REPORT
router.get('/sales-repo', adminloggedout, order.getDeliveredReport)
//COUPON
router.get('/coupon', adminloggedout, coupon.couponList)
//ADD CAT OFFER
router.post('/add-catOffer', coupon.addcatOffer)
//DELETE CAT OFFER
router.get('/delete-cat-offer/:id', coupon.deleteCatOffer)
//ADD PROD OFFER
router.post('/add-prodOffer',coupon.addProdOffer)
//DELETE PROD OFFER
router.get('/delete-prod-offer/:id',coupon.deleteProdOffer)
//ADD COUPON
router.post('/add-coupon',coupon.addCoupon)
//DELETE COUPON
router.get('/delete-coupon-offer/:id',coupon.deleteCoupon)



module.exports = router;
