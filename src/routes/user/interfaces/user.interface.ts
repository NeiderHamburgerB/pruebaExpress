import { Document } from 'mongoose'

export interface IUser extends Document {
    document:{
        type:string,
        value:string
    }
    name:string
    lastname:string
    email:string
    password?:string
    roles:string[],
    active:boolean
}


export interface IUserCreate extends Document {
    document:{
        type:string,
        value:string
    }
    name:string
    lastname:string
    email:string
    password:string
    roles:string[],
    active:boolean
}

export interface IUserUpdate extends Document {
    document?:{
        type:string,
        value:string
    }
    name?:string
    lastname?:string
    email?:string
    active?:boolean
}


export interface IUserSearch{
    email?:string ,
    _id?:string,
    document?:string
}