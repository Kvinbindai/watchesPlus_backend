const fs = require('fs/promises');
const path = require('path');
const dir = require('../../public/dir')

const {public_dir} = dir
const clearPhoto = async (req,res,next) => {
    try{
        const photoPath = public_dir+'/images' //ลบของที่อยุ่ใน public/images
        const files = await fs.readdir(photoPath)
        if(files){
            const deleteFilePromises = files.map(file => fs.unlink(path.join(photoPath,file)))
            await Promise.all(deleteFilePromises)
        }
        next()
    }catch(err){
        console.log(err)
    }
}

module.exports = clearPhoto