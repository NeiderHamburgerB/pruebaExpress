import jwt from "jsonwebtoken"
import { roles } from '../config/roles/roles'
import { Response } from "express"
import { UserService } from '../routes/user/user.service'

export const grantAccess = function(action:any, resource:any) {
 
    return async (req:any, res:Response , next:any) => {

        let auth = req.headers['authorization']    
        
        if (!auth) return res.status(403).json({ message: "Not proportional token" }).end()
        
        const token = auth.split(' ')[1]
        
        try {
          
            jwt.verify(token, `${process.env.JWT_SECRET}`, (err, user: {}) =>{
                if (err) throw new Error('error'+err); 
                req.user = user 
                next()
            })

            let _id = req.user.sub

            let user = await UserService.one({_id},false)

            const permission = roles.can(user.roles)[action](resource)

            if (!permission.granted ) {
                return res.status(401).json({
                    err: "Unauthorized"
                })
                next()
            }
        
        } catch (err) {
            next(err)
        }
    }
}