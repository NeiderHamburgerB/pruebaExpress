import { AccessControl } from "accesscontrol"
export enum RolesApp {
    ADMIN    = 'ADMIN',
    EMPLOYEE = 'EMPLOYEE'
}

export enum ResourcesApp {
    PRODUCT = 'PRODUCT',
    USER = 'USER'
}

const ac = new AccessControl()
export const roles = (function() {
    ac
        //rol de empleado
        .grant(RolesApp.EMPLOYEE)
        .createAny([ResourcesApp.PRODUCT])//Empleado puede crear cualquier producto 
        .readAny([ResourcesApp.PRODUCT]) //Empleado puede ver todos los productos
        .updateAny([ResourcesApp.PRODUCT]) //Empleado puede editar cualquier producto que este registrado asi el no sea el creador

     
        //rol de administrador
        .grant(RolesApp.ADMIN)
        .extend(RolesApp.EMPLOYEE) //hereda lo que puede hacer el empleado
        .deleteAny([ResourcesApp.PRODUCT]) //administrador puede eliminar cualquier producto
        .createAny([ResourcesApp.USER])//administrador puede crear cualquier usuario
        .readAny([ResourcesApp.USER])//administrador puede ver todos los usuario
        .updateAny([ResourcesApp.USER])//administrador puede editar cualquier usuario
       
    return ac
})()

