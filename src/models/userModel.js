import mongoose from 'mongoose'
const  {Schema,model} = mongoose
import  bcrypt  from 'bcryptjs'
// const { string } = require('joi')
let usersSchema= new Schema({
   
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
},
{timestamps:true})

usersSchema.pre("save", async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  });

export default  mongoose.model('users', usersSchema)