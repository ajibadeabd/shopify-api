import multer from 'multer'
import express from 'express'
import path from 'path'
import CustomError from './customError.js'

//set storage engine

const storage = multer.diskStorage(
    {destination:"./uploads/",
    filename:(req,file,cb)=>{
        cb(null,file.fieldname + "-"+ Date.now()+
        path.extname(file.originalname))
    }}
)

//init uload
const upload=multer({
    storage:storage,
    limits:{fileSize:1000000},
    fileFilter:(req,file,cb)=>{
        checkFileType(file,cb)

    }
})
 
//check file type
const checkFileType=(file,cb)=>{
    //allowe exit
    const filetypes = /jpeg|jpg|png/;
    // check ext
    const extname= filetypes.test(path.extname(file.originalname)
    .toLowerCase())

    //check mime
    const mimetype = filetypes.test(file.mimetype) 

    if(mimetype && extname){
        return cb(null,true)
    }else{
        cb( new CustomError("upload only images with 'jpeg' 'jpg' 'png' ",400))
    }
}


export default upload