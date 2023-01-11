
var db = require('../../config/connection')
var collection = require('../../config/collection')
const { ObjectId, Db } = require("mongodb");
const { ObjectID } = require("bson");

module.exports = {
    getUserOrders: (userId) => {
        return new Promise(async (resolve, reject) => {
            let orders = await db.get().collection(collection.ORDER_COLLLECTION).find({
                userId: ObjectId(userId)
            }).sort({ date: -1 }).toArray()
            resolve(orders)
        })
    },
    cartCount: (userId) => {
        return new Promise(async (resolve, reject) => {
            let count = 0
            let cart = await db.get().collection(collection.CART_COLLECTION).findOne({ user: ObjectId(userId) })

            if (cart) {
                count = cart.products.length
            }
            resolve(count)
        })

    },
    getOrderProduct: (orderId) => {
        return new Promise(async (resolve, reject) => {
            let cartItem = await db
                .get()
                .collection(collection.ORDER_COLLLECTION)
                .aggregate([
                    {
                        $match: { _id: ObjectId(orderId) },
                    },
                    {
                        $unwind: '$products'
                    },
                    {
                        $project:
                        {
                            item: '$products.item',
                            quantity: '$products.quantity'
                        }
                    },
                    {
                        $lookup: {
                            from: collection.PRODUCT_COLLECTION,
                            localField: 'item',
                            foreignField: '_id',
                            as: 'products'
                        }
                    },
                    {
                        $project: {
                            item: 1, quantity: 1, product: { $arrayElemAt: ['$products', 0] }
                        }
                    }

                ])
                .toArray();
            resolve(cartItem);
        });
    },
    cancelOrder: (orderId) => {
        return new Promise((resolve, reject) => {

            db.get()
                .collection(collection.ORDER_COLLLECTION)
                .updateOne({ _id: ObjectId(orderId) }, [
                    { $set: { status: 'cancelled', btn: false } },
                ])
                .then((response) => {

                    resolve({ status: true });
                });
        });
    },
    returnOrder: (orderId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.ORDER_COLLLECTION).updateOne({ _id: ObjectID(orderId) }, { $set: { status: 'Return Process Started', return: false, returnDate: new Date, productReturning: true, btn: false } }).then(() => {
                resolve()
            })
        })
    },
    

}