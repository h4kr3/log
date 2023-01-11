var db = require('../../config/connection')
var collection = require('../../config/collection')
const { ObjectId, Db } = require("mongodb");
const { ObjectID } = require("bson");

module.exports = {
    getUserDetails: (userId) => {
        return new Promise((resolve, reject) => {
            let user = db.get().collection(collection.USER_COLLECTION).findOne({ _id: ObjectID(userId) })
            resolve(user)
        })
    },
    addProfileDetails: (user) => {
        return new Promise((resolve, reject) => {
            address = {
                address: user.address,
                country: user.country,
                state: user.state,
                pincode: user.pincode
            }
            db.get().collection(collection.USER_COLLECTION).updateOne({ _id: ObjectId(user.userId) }, { $set: { address: [address] } }).then((response) => {
                resolve(response)
            })
        })
    },
    verifyPwd: (userId, userData) => {
        return new Promise(async (resolve, reject) => {
            let response = {};
            let user = await db
                .get()
                .collection(collection.USER_COLLECTION)
                .findOne({ _id: ObjectId(userId) });

            bcrypt.compare(userData.password, user.password).then((status) => {
                if (status) {
                    response.user = user;
                    response.status = true;
                    resolve(response);
                } else {
                    resolve({ status: false });
                }
            });
        })
    },
    changePwd: (pwd, userId) => {
        return new Promise(async (resolve, reject) => {
            pwd = await bcrypt.hash(pwd, 10);
            db.get().collection(collection.USER_COLLECTION).updateOne({ _id: ObjectId(userId) }, { $set: { password: pwd } }).then((response) => {
                response.status = true
                resolve(response)
            })
        })
    },
    
}