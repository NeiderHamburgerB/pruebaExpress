import { AuthService } from "./auth.service"
import { Request, Response } from "express"
import passport from "passport"
import jwt from 'jsonwebtoken'
import { IUser } from "../user/interfaces/user.interface"

export class AuthController {
   
    static async login(req:Request,res:Response, next:any){
        
        AuthService.validation(req,res)

        passport.authenticate('login', async (err, user:IUser) => {
  
            try {

              if (err || !user) return next(err)
              
              req.login(user, { session: false }, async (err) => {
                
                if (err) return next(err)
               
                let { _id,active } = user

                let payload = { sub: _id }
            
                if(active) {
                    return res.json({
                        user,
                        accessToken : jwt.sign(payload, `${process.env.JWT_SECRET}`,{expiresIn:'24h'})
                     })
                }else{
                    res.status(401).json({
                        message:'Inactive user, contact administrator'
                    })
                }
              })
            }
            catch(e) {
              return next(e)
            }
          })(req, res, next)

    }
}


