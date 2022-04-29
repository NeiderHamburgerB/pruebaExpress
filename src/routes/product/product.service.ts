import { validationResult } from "express-validator"
import { Request, Response } from "express"
import { IProduct, IUpdateProduct } from "./interfaces/product.interface"
import ProductModel from '../../schemas/product.schema'

export class ProductService {

    static validation(req:Request,res:Response){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(422).json({errors: errors.array()})
        } 
    }

    static async create(data:IProduct, user:{sub?:any,iat?:number,exp?:number}, res:Response){
        
        data.createdBy = user.sub

        try {
            
            let { acknowledged } = await ProductModel.updateOne(
                {name:data.name},
                {$set:data},
                {upsert:true}
            )

            if(acknowledged) return res.status(201).json({message:'Operation success'})
            
        } catch (error) {
            return error
        }
       
    }

    static async all(): Promise<IProduct[]>{
        return await ProductModel
                    .find()
                    .select('-createdAt -updatedAt')
                    .populate({path:'createdBy',select:{name:1, lastname:1, email:1, _id:0}})
    }

    static async one(id:string): Promise<IProduct>{
        return await ProductModel
                    .findOne({_id:id})
                    .select('-createdAt -updatedAt')
                    .populate({path:'createdBy',select:{name:1, lastname:1, email:1, _id:0}})
    }

    static async update(id:string, data:IUpdateProduct):Promise<IProduct>{
       

        try {
            return await ProductModel
                .findByIdAndUpdate(id, data, {new:true})
                .select('-createdAt -updatedAt')
                    .populate({path:'createdBy',select:{name:1, lastname:1, email:1, _id:0}})
        } catch (error) {
            return error
        }
         
    }

    static async delete(id:string, res:Response){
        try {
            await ProductModel.findByIdAndDelete(id)
            return res.status(200).json({
                message:'Product deleted'
            })
           
        } catch (error) {
            return error
        }
    }

}