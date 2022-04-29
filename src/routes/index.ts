import { Router } from "express"
import auth from "../routes/auth/routes"
import user from "../routes/user/routes"
import product from "../routes/product/routes"
const routes = Router()

routes.use("/auth", auth)
routes.use("/user", user)
routes.use("/product", product)

export default routes