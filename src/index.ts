import app from './app'
import { Conection } from './config/database/connection'

app.listen(process.env.PORT, ()=>{
    Conection.connect()
})