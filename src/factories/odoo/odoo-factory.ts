import { OdooRepository } from "src/repositories/odoo/external/odoo-repository";
import { OdooCases } from "src/use-cases/odoo/odoo-cases";

export const odooFactory = (): OdooCases => {
    const odooRepository = new OdooRepository()
    const odooCases = new OdooCases(odooRepository)

    return odooCases
}