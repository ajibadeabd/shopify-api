import customError from "../utility/customError.js";
const admin=(role=[])=>(req,res,next)=>{
    if(role.length==0 || !role.includes(req.user.userType))
        throw new customError('unauthorized user')
    next()
  }


export default admin

  