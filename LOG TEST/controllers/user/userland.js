const productHelper = require('../../models/user/product')

module.exports = {
    userLand:async (req, res, next) => {
        let category = await productHelper.getAllCategory();
        let products = await productHelper.getAllProducts();
        if (req.session.userLoggedIn) {
          let cartCount = await productHelper.cartCount(req.session.user._id)
          res.render("user/index", { usersi: true, category, cartCount, products });
        }
        else {
          res.render("user/index", { usersi: false, category, products });
        }
      }
}