import customError from "../utility/customError.js";
import User from "../models/userModel.js";
// import validator from "../helper/userValidator.js";
import otpGenerator from 'otp-generator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import Email  from '../utility/mailServices.js'




class userService {
    async register(req,res){
        let {email,password} =req.body
        if(!email ) throw new customError('please include your email')
        let isUserExist = await User.findOne({email:email})
        if(isUserExist) throw new customError('email has been taken')
        if(!password ) throw new customError('please provide your password')
        if( password.length<5 ) throw new customError('password must be up to 5 character')

        let saveUser={email,password}
        await new User(saveUser).save()
        return  
    // }
    }

    async login(req,res){
        let {email,password} =req.body
        let isUserExist = await User.findOne({email:email})
        if(!isUserExist) throw new customError('no user found')
        let passCorrect = await bcrypt.compare(password,isUserExist.password)
        if(!passCorrect) throw new customError('password incorrect')
        let user=_.pick(isUserExist,["_id","email"])
        let accessToken =await jwt.sign(user,process.env.jwtSecret,{expiresIn:`${process.env.accessTokenExpiresIn}`})
        return {...user,token:`Bearer ${accessToken}`}
    }

    async getProfile(req,res){
    //     let UserExist =await userExist(User,req.user.email)
    //    let userProfile=_.pick(UserExist.user,["email","firstName","lastName","_id","userType"])
    //     return userProfile



    }


}

export default new userService()
 