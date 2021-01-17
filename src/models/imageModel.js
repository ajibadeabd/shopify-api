import mongoose from 'mongoose'
const  {Schema,model} = mongoose
let imageSchema= new Schema({
   
    user:{
        type:Schema.Types.ObjectId,
        required:true,
    },
    
    permission:{
        type:String,
        required:true
    },
    images__url:{
        type:String,
        required:true
    },
},
{timestamps:true})

export default  mongoose.model('image', imageSchema)