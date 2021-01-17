// app.post('/upload-images',upload.array('image'),async (req,res)=>{
//     const uploader =  async (path)=> await cloudinary.uploads(path,'Images')
//     // if(req.method==='POST')
//     // {
        // const urls =[]
        //     const files = req.files
        //     for(file of files){
        //         const {path}=file
        //         const newPath= await uploader(path)
        //         urls.push(newPath)
        //         fs.unlinkSync(path)
//             }
//     res.status(200).json({
//         message:'images uploaded successfully',
//         data:urls
//     })
//     // }
// });


import customError from "../utility/customError.js";
import User from "../models/userModel.js";
import Image from "../models/imageModel.js";


import mongoose from "mongoose";


class upldService {
  
   async  upload__image(req,res){

    const {permission} = req.body
    const files = req.files
    if(!['public','private'].includes(permission))
     throw new customError('permission must be set to Public or private')
        // for(file  files){
        //     const {path}=file
        //     console.log(path)
        //     // const newPath= await uploader(path)
        //     // urls.push(newPath)
        //     // fs.unlinkSync(path)
        // }
        for(let i=0; i<files.length;i++){
        // req.body['images__url']=files[i].path

        const saveUserImage = new Image({
            user:req.user._id,
            images__url:files[i].path,
            permission:permission
        }).save()
    }

       
        return 
    }
   async  view__all__images(req,res){
       let user__Image=await Image.find({user:req.user._id})
       
    if(user__Image.length <1)
    throw new customError('you have no images in your repository')

       return user__Image

   }
   async  view__each__image(req,res){
    let imageId = req.params.imageId

    //validate image id
    let isValidImages = mongoose.Types.ObjectId.isValid(imageId)
     let eachImageExist  = await Image.findOne({_id:imageId,user:req.user._id})
 if(!eachImageExist)
 throw new customError('image does nsot exist')

    return eachImageExist

}
   
   async  delete__each__images(req,res){
    let imageId = req.params.imageId

    //validate image id
    let isValidImages = mongoose.Types.ObjectId.isValid(imageId)
    // check if image id is valid
    if(!isValidImages)
     throw new customError('the image selected is an invalid image selection')

     //find the image
     let isImageExist  = await Image.findOne({_id:imageId,user:req.user._id})
     //check if image exist 
     if(!isImageExist)
     throw new customError('image does not exist ')

    //  //check if it the users image

    //  if(isImageExist.user!=req.user._id)
    // throw new customError('you dont have permission to delete this image')

      await Image.findByIdAndRemove(imageId)

    return isValidImages

}


}

export default new upldService()
 