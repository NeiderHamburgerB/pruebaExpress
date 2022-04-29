import { Router } from 'express'
import { ProductController } from './product.controller'
import { grantAccess } from '../../middlewares/roles'
import { ResourcesApp } from '../../config/roles/roles'
import { ProductCreateDto, ProductUpdateDto } from './dto/product.dto'

export class ProductRoutes {

    public router: Router = Router()

    constructor() {
        this.config()
    }

    config(): void {
        
        this.router.post('/create',[...ProductCreateDto,grantAccess('createAny', ResourcesApp.PRODUCT) ],ProductController.create)

        this.router.get('/all',[grantAccess('readAny', ResourcesApp.PRODUCT) ],ProductController.all)

        this.router.get('/one/:id',[grantAccess('readAny', ResourcesApp.PRODUCT) ],ProductController.one)

        this.router.put('/update/:id',[...ProductUpdateDto,grantAccess('updateAny', ResourcesApp.PRODUCT) ],ProductController.update)

        this.router.delete('/delete/:id',[grantAccess('deleteAny', ResourcesApp.PRODUCT) ],ProductController.delete)

    }

}

const productRoutes  = new ProductRoutes ()
export default productRoutes.router