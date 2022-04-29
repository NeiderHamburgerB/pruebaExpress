import { UserService } from "./user.service"
import { Request, Response } from "express"

export class UserController {
   
    static async create(req:Request,res:Response, next:any){
        UserService.validation(req,res)
        await UserService.create(req.body, res)    
    }

    static async all(req:Request,res:Response, next:any){
        let users = await UserService.all()
        res.status(200).json({
            users
        })
    }

    static async one(req:Request,res:Response, next:any){
        let { _id } = req.params
        let user = await UserService.one({ _id},false)
        res.status(200).json({
            user
        })
    }

    static async update(req:Request,res:Response, next:any){
        UserService.validation(req,res)
        let { _id } = req.params
        let user = await UserService.update(_id,req.body)
        res.status(200).json({
            user
        })
    }


}


