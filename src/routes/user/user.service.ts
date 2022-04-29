
import UserModel from '../../schemas/user.schema'
import { IUser, IUserCreate, IUserSearch, IUserUpdate } from './interfaces/user.interface'
import { hashSync, genSaltSync } from 'bcryptjs'
import { validationResult } from "express-validator"
import { Request, Response } from "express"

export class UserService{

    static validation(req:Request,res:Response){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(422).json({errors: errors.array()})
        } 
    }
    
    static async one(data:IUserSearch, watch:boolean): Promise<any>{
        return await UserModel
            .findOne(data)
            .select(`-createdAt -updatedAt ${watch ? '' : '-password'}`)
            .lean()        
    }

    static hash(password:string){
        return hashSync(password, genSaltSync(8))
    }

    static async create(data:IUserCreate, res:Response){
        
        try {
            
            data.password = this.hash(data.password)
            
            let user = await UserModel.exists({
                $or:[{email:data.email},{'document.value':data.document.value}]
            })
            
            if(!user) {
                data.password = this.hash(data.password)

                let register = await UserModel.create(data)
                
                if(register === null || register === undefined) throw new Error('Imposible save user')
                
                await register.save()
    
                return res.status(201).json({message: 'User created'}).end()
            }else{
            
                return res.status(406).json({message: 'User exits'}).end()

            }
            
        } catch (err:any) {

           return err.message
        
        }
    }

    static async all(): Promise<IUser[]> {
        return await UserModel
            .find()
            .select('-createdAt -updatedAt')
    }


    static async update(id:string, data:IUserUpdate): Promise<IUser>{
        
        try {
            
            return await UserModel 
                    .findByIdAndUpdate(id,data,{new:true})
                    .select(`-createdAt -updatedAt -password`)
                    .lean()

        } catch (err) {
            throw new Error('err '+err)
        }
       
    }




}