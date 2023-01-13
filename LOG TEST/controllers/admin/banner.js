const bannerHelper = require('../../models/admin/banner')
const cloudinary = require('../../utils/cloudinary')
const multer = require('multer')
const path = require('path');

upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname)
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".webp") {
            cb(new Error("File type is not supported"), false)
            return
        }
        cb(null, true)
    }
})

module.exports = {
    getBanner:(req,res)=>{
        res.render('admin/banner')
    },
    addImage:async (req, res) => {
        const cloudinaryImageUploadMethod = (file) => {
            return new Promise((resolve) => {
                cloudinary.uploader.upload(file, (err, res) => {
                    if (err) return res.status(500).send("Upload Image Error")
                    resolve(res.secure_url)
                })
            })
        }
        const files = req.files
        let arr1 = Object.values(files)
        let arr2 = arr1.flat()
        const urls = await Promise.all(
            arr2.map(async (file) => {
                const { path } = file
                const result = await cloudinaryImageUploadMethod(path)
                return result
            })
        )
        bannerHelper.addImage(req.body, urls).then((id) => {
            if (id) {
               res.redirect('/admin/banner')
            }
            else {
                res.render({invalid:'image not uploaded'})
            }
        })

    }
}