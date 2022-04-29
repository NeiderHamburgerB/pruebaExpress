import { check } from "express-validator"

export const ProductCreateDto = [

    check('createdBy').isString().optional({nullable: true}),
    check('name').isString(),
    check('price').isNumeric(),
    check('sku').isNumeric(),
    check('sales').isNumeric(),
    check('active').isBoolean()

]

export const ProductUpdateDto = [
    check('name').isString().optional({nullable: true}),
    check('price').isNumeric().optional({nullable: true}),
    check('sku').isNumeric().optional({nullable: true}),
    check('sales').isNumeric().optional({nullable: true}),
    check('active').isBoolean().optional({nullable: true})
]