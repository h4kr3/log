var db = require('../../config/connection')
var collection = require('../../config/collection')
const { ObjectId, Db } = require("mongodb");

module.exports = {
    addImage:(name,imageurl)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.BANNER_COLLECTION).insertOne({bannerName:name.banner,bannerImage:imageurl}).then((response)=>
            {
                resolve(response)
            })
        })
        
    },
    getImageBanner:()=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.BANNER_COLLECTION).findOne({bannerName:'banner1'}).then((response)=>{
                resolve(response)
            })
        })
    }
}