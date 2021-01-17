import Jwtp  from 'passport-jwt'
import User from "../models/userModel.js";
const JwtStrategy  = Jwtp.Strategy;
const ExtractJwt  = Jwtp.ExtractJwt;
const key= process.env.jwtSecret;
  const opts={};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken() 
  opts.secretOrKey=key
  export default passport=>{
      passport.use(
          new JwtStrategy(opts,(jwt_payload,done)=>{
     User.findById(jwt_payload._id)
     .then((user)=>{
         if(user)
            return done(null,user)
         return done(null,false);

     })
     .catch(err=>{
         console.log(err)
     })
          })
      )
  }