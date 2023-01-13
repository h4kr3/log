var db = require('../../config/connection')
var collection = require('../../config/collection')
const { ObjectId, Db } = require("mongodb");

module.exports = {
    getImageBanner:()=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.BANNER_COLLECTION).findOne({bannerName:'banner1'}).then((response)=>{
                resolve(response)
            })
        })
    }
}