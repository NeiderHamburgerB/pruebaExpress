import mongoose from "mongoose"

export class Conection {

    static async connect(){
        try {
            return await mongoose.connect(`${process.env.MONGO_URI}`)
                .then(db => console.dir('Mongo loaded'))
        } catch (error) {
            return error
        }
       
    }
}


