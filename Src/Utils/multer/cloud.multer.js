import multer from 'multer';
import { cloudinaryConfig } from './cloudinary.js';

export const cloudFileUpload = ({validation = []})=>{
    
    const storage = multer.diskStorage({})
    const fileFilter = (req , file , cb)=>{
        if(validation.includes(file.mimetype)){
            cb(null,true);
        }else{
            return cb(new Error("Invalid File Type"),false)
        }
    }
    return multer({
        fileFilter,
        storage,
    })
}

export const uploadToCloudinary = async ({
    filePath,
    folder,
    options = {},
    next
}) => {
    if (!filePath) {
        return next (new Error("filePath is required for Cloudinary upload"));
    }

    return await cloudinaryConfig().uploader.upload(filePath, {folder,...options});
}

export const destroyToCloudinary = async({
    filePath,
    next,
    options = {}
}) =>{
    if (!filePath) {
        return next (new Error("filePath is required for Cloudinary upload"));
    }

    return await cloudinaryConfig().uploader.destroy(filePath, options);

}