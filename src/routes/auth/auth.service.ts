import { Request, Response } from "express"
import { validationResult } from "express-validator"

export class AuthService {

    static validation(req:Request,res:Response){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(422).json({errors: errors.array()})
        } 
    }

   


}
