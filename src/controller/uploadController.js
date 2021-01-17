import upldServ from "../services/uploadService.js";
import response from "../utility/response.js";

class userCntroller{
    async upload__image(req,res){
        let data = await upldServ.upload__image(req,res);
       res.status(200).json(response(true,`image successfully uploaded`,data)) 
    }
    
    async view__all__images(req,res){
        let data = await upldServ.view__all__images(req,res);
       res.status(200).json(response(true,`image successfully fetched`,data)) 
    }

    
    async delete__each__images(req,res){
        let data = await upldServ.delete__each__images(req,res);
       res.status(200).json(response(true,`image successfully deleted`,data)) 
    }
    
    async view__each__image(req,res){
        let data = await upldServ.view__each__image(req,res);
       res.status(200).json(response(true,`image successfully fetched`,data)) 
    }//view__each__images
    
}
export default new userCntroller()