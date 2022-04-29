import { Router } from 'express'
import { UserController } from './user.controller'
import { UserCreateDto } from '../user/dto/user.dto'
import { grantAccess } from '../../middlewares/roles'
import { ResourcesApp } from '../../config/roles/roles'

export class UserRoutes {

    public router: Router = Router()

    constructor() {
        this.config()
    }

    config(): void {
        
        this.router.post('/create',[...UserCreateDto,grantAccess('createAny', ResourcesApp.USER) ],UserController.create)

        this.router.get('/all',[grantAccess('readAny', ResourcesApp.USER) ],UserController.all)

        this.router.get('/one/:_id',[grantAccess('readAny', ResourcesApp.USER) ],UserController.one)

        this.router.put('/update/:_id',[grantAccess('updateAny', ResourcesApp.USER) ],UserController.update)
    }

}

const userRoutes = new UserRoutes()
export default userRoutes.router