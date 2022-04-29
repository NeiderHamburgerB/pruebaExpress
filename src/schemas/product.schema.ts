import { Schema,Types, model } from "mongoose"
import { IProduct } from "../routes/product/interfaces/product.interface"

export const ProductSchema = new Schema({

    createdBy:{
        type:Types.ObjectId,
        ref:'User'
    },
    name:{
        type:String
    },
    price:{
        type:Number
    },
    sku:{
        type:Number
    },
    sales:{
        type:Number
    },
    active:{
        type:Boolean
    }

},{
    timestamps:true,
    versionKey:false
})
export default model<IProduct>('Product', ProductSchema, 'Product')