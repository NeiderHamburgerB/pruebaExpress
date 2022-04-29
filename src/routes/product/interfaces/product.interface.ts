import { Document } from "mongoose"

export interface IProduct extends Document{
    createdBy:string
    name:string
    price:string
    sku:number
    sales:number
    active:boolean
}

export interface IUpdateProduct extends Document{
   
    name?:string
    price?:string
    sku?:number
    sales?:number
    active?:boolean
}

