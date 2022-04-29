import { ProductService } from "./product.service"
import { Request, Response } from "express"

export class ProductController {
   
    static async create(req:Request,res:Response, next:any){
        
        ProductService.validation(req,res)

        await ProductService.create(req.body, req.user,res)
       
    }

    static async all(req:Request,res:Response, next:any){
        let products = await ProductService.all()
        res.status(200).json({
            products
        })
    }

    static async one(req:Request,res:Response, next:any){
        let { id } = req.params
        let product = await ProductService.one(id)
        res.status(200).json({
            product
        })
    }

    static async update(req:Request,res:Response, next:any){
        ProductService.validation(req,res)
        let { id } = req.params
        let product = await ProductService.update(id,req.body)
        res.status(200).json({
            product
        })
    }
    
    static async delete(req:Request,res:Response, next:any){
        let { id } = req.params
        await ProductService.delete(id,res)
        
    }


}


