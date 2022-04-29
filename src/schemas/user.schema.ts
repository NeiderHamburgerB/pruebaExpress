import {model, Schema} from "mongoose"

import { RolesApp } from "../config/roles/roles"
import { IUser } from "../routes/user/interfaces/user.interface";

const UserSchema = new Schema({
    document:{
        type:{
            type:String
        },
        value:{
            type:String
        }
    },
    name:{
        type:String
    },
    lastname:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    roles:[
        {
            type:String,
            enum: {values: Object.values(RolesApp), message: 'USE A VALID ROLE' }
        }
    ],
    active:{
        type:Boolean
    }
},{
    timestamps:true,
    versionKey:false
})

export default model<IUser>('User', UserSchema, 'User')

